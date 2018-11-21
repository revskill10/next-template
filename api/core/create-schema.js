const { mergeSchemas } = require('graphql-tools')
const { importSchema } = require('graphql-import')
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
  const adminReportingContext = createAdminContext('reportingService', {urlMap})
  const adminUserContext = createAdminContext('userService', {urlMap})
  const graphCmsContext = createAdminContext('cmsService', {urlMap})
  
  
  const subscriptionClients = {
    reportingService: createWsClient('reportingService', adminReportingContext),
    userService: createWsClient('userService', adminUserContext),
    cmsService: createWsClient('cmsService', graphCmsContext),
  }  

  const adminLinks = {
    reportingService: createAdminLink('reportingService', {
      ...adminReportingContext,
      subscriptionClients,
    }),
    userService: createAdminLink('userService', {
      ...adminUserContext,
      subscriptionClients,
    }),
    cmsService: createAdminLink('cmsService', {
      ...graphCmsContext,
    })
  }

  const adminClients = {
    reportingService: getApolloClient(adminLinks.reportingService),
    userService: getApolloClient(adminLinks.userService),
    cmsService: getApolloClient(adminLinks.cmsService),
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

async function makeSchema(adminLinks, urlMap) {
  let reportingSchema = await getRemoteSchema(adminLinks['reportingService'])
  
  if (urlMap['reportingService'].permissions) {
    reportingSchema = applyMiddleware(reportingSchema, urlMap['reportingService'].permissions)
  }
  
  let userSchema = await getRemoteSchema(adminLinks['userService'])
  if (urlMap['userService'].permissions) {
    userSchema = applyMiddleware(reportingSchema, urlMap['userService'].permissions)
  }
  const eduSchema = await soapGraphqlSchema(process.env.EDU_URL)
  let cmsSchema = await getRemoteSchema(adminLinks['cmsService'])
  if (urlMap['cmsService'].permissions) {
    cmsSchema = applyMiddleware(graphSchema, urlMap['cmsService'].permissions)
  }
  
  let localSchema = importSchema(join(__dirname, '../user/typedefs/schema.graphql'))
  const resolvers = require('../user/resolvers')
  return mergeSchemas({
    schemas: [
      userSchema, 
      reportingSchema,
      eduSchema,
      cmsSchema,
      localSchema,
    ],
    resolvers
  })
}

async function createSchema(urlMap) {
  const { adminLinks, adminClients } = makeAdminClients(urlMap)
  const schema = await makeSchema(adminLinks, urlMap)
  return {schema, adminClients}
}
module.exports = createSchema