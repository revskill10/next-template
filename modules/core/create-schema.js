const { mergeSchemas } = require('graphql-tools')
const { applyMiddleware } = require('graphql-middleware')
const { soapGraphqlSchema } = require('soap-graphql')
const bodyParser = require('body-parser')

const { 
  getApolloClient,
  createWsClient,
  createAdminContext,
  createAdminLink
} = require('./create-link')

const { 
  introspectSchema, 
  makeRemoteExecutableSchema,
} = require('graphql-tools')

const {join} = require('path')


function makeAdminClients(urlMap) {
  let contexts = {}
  let subscriptionClients = {}
  let adminLinks = {}
  let adminClients = {}
  for(let key in urlMap) {
    if (urlMap.hasOwnProperty(key)) {
      if (urlMap[key].type === 'graphql') {
        contexts[key] = createAdminContext(key, {urlMap})
        subscriptionClients[key] = createWsClient(key, contexts[key])      
      }
    }
  }
  for(let key in urlMap) {
    if (urlMap.hasOwnProperty(key)) {
      if (urlMap[key].type === 'graphql') {
        adminLinks[key] = createAdminLink(key, {
          ...contexts[key],
          subscriptionClients,
        })
        adminClients[key] = getApolloClient(adminLinks[key])
      }
    }
  }
  
  return {adminLinks, adminClients}
}

async function getRemoteSchema ({link}) {
  const schema = await introspectSchema(link);
  const executableSchema = makeRemoteExecutableSchema({
    schema,
    link,
  });
  return executableSchema;
}

async function makeSchema(adminLinks, urlMap, {localSchema, resolvers}) {
  let remoteSchemas = []
  for(let key in urlMap) {
    if (urlMap.hasOwnProperty(key)) {
      let tmp = null
      if (urlMap[key].type === 'graphql') {
        tmp = await getRemoteSchema(adminLinks[key])        
      }     
      if (urlMap[key].type === 'soap') {
        tmp = await soapGraphqlSchema(urlMap[key].url)        
      }
      if (urlMap[key].permissions) {
        tmp = applyMiddleware(tmp, urlMap[key].permissions)
      }
      remoteSchemas.push(tmp)
    }
  }
  
  return mergeSchemas({
    schemas: [
      ...remoteSchemas,
      localSchema,
    ],
    resolvers
  })
}

async function createSchema(urlMap, {localSchema, resolvers}) {
  const { adminLinks, adminClients } = makeAdminClients(urlMap)
  const schema = await makeSchema(adminLinks, urlMap, {localSchema, resolvers})
  return {schema, adminClients}
}
module.exports = createSchema