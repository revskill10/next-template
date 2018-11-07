const dotenv = require('dotenv')
dotenv.config()
const { GraphQLServer, PubSub } = require('graphql-yoga')
const { mergeSchemas,transformSchema,
  RenameTypes,
  RenameRootFields } = require('graphql-tools')
const { importSchema } = require('graphql-import')
const getCurrentUser = require('./get-current-user')
const { rule, shield, and, or, not } = require('graphql-shield')
const { applyMiddleware } = require('graphql-middleware')
const { soapGraphqlSchema } = require('soap-graphql')

const { 
  getApolloClient,
  makeConnectionParams,
  createWsClient,
  createAdminContext,
  createAdminLink
} = require('./create-link')

const { 
  introspectSchema, 
  makeRemoteExecutableSchema,
} = require('graphql-tools')

function renameSchema(remoteExecSchema, prefix) {
  return transformSchema(
    remoteExecSchema,
    [
      new RenameTypes((type) => `${prefix}_${type}`),
      new RenameRootFields((operation, name) => `${prefix}_${name}`)
    ]
  );
} 

const canViewReport = rule()(async function(parent, args, ctx, info) {
  return ctx.currentUser.roles.includes('staff')
})

const canAssignRoles = rule()(async function(parent, args, ctx, info) {
  return ctx.currentUser.roles.includes('admin')
})

const urlMap = {
  'reportingService': {
    uri: process.env.REPORTING_SERVICE_GRAPHQL_URL,
    subUri: process.env.REPORTING_SERVICE_SUBSCRIPTION_URL,
    headers: {
      "X-Hasura-Access-Key": process.env.HASURA_ACCESS_KEY,
      "Content-Type": "application/json",
    },
    prefix: 'reporting',
    permissions: shield({
      'query_root': {
        v_all_lesson_class: canViewReport,
      },      
      'subscription_root': {
        v_all_lesson_class: canViewReport,
      },
    })
  },
  'userService': {
    uri: process.env.USER_SERVICE_GRAPHQL_URL,
    subUri: process.env.USER_SERVICE_SUBSCRIPTION_URL,
    headers: {
      "X-Hasura-Access-Key": process.env.HASURA_ACCESS_KEY,
      "Content-Type": "application/json",
    },
    prefix: null,
    permissions: null
  },
  'localService': {
    permissions: shield({
      Mutation: {
        assignRoles: canAssignRoles,
      },
    })
  }
}

function makeAdminClients(urlMap) {
  const adminReportingContext = createAdminContext('reportingService', {urlMap})
  const adminUserContext = createAdminContext('userService', {urlMap})
  
  
  const subscriptionClients = {
    reportingService: createWsClient('reportingService', adminReportingContext),
    userService: createWsClient('userService', adminUserContext),
  }  

  const adminLinks = {
    reportingService: createAdminLink('reportingService', {
      ...adminReportingContext,
      subscriptionClients,
    }),
    userService: createAdminLink('userService', {
      ...adminUserContext,
      subscriptionClients,
    })
  }

  const adminClients = {
    reportingService: getApolloClient(adminLinks.reportingService),
    userService: getApolloClient(adminLinks.userService),
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

async function makeSchema(adminLinks) {
  let reportingSchema = await getRemoteSchema(adminLinks['reportingService'])
  
  if (urlMap['reportingService'].permissions) {
    reportingSchema = applyMiddleware(reportingSchema, urlMap['reportingService'].permissions)
  }
  
  let userSchema = await getRemoteSchema(adminLinks['userService'])
  if (urlMap['userService'].permissions) {
    userSchema = applyMiddleware(reportingSchema, urlMap['userService'].permissions)
  }
  const eduSchema = await soapGraphqlSchema(process.env.EDU_URL)
  
  let localSchema = importSchema(__dirname + '/typedefs/schema.graphql')
  const resolvers = require('./resolvers')
  return mergeSchemas({
    schemas: [
      userSchema, 
      reportingSchema,
      eduSchema,
      localSchema,
    ],
    resolvers
  })
}

async function createServer({dev}) {
  const { adminLinks, adminClients } = makeAdminClients(urlMap)
  const schema = await makeSchema(adminLinks)

  const pubsub = new PubSub()

  const server = new GraphQLServer({
    schema,
    introspection: true,
    playground: true,
    cors: {
      origin: "*",
      credentials: 'include',
    },
    context: context({pubsub, dev, urlMap, adminClients}),    
  });

  return server;
}

function context({dev, pubsub, urlMap, adminClients}) {
  return function({connection, request, response}) {
    if (connection && connection.context) {
      return {
        ...connection.context,
        pubsub,
        dev,
        urlMap,
        getApolloClient,
        ws: true,
        adminClients,
      }
    }
    if (request) {
      const {token, currentUser} = getCurrentUser({token: request.headers['token']})
      const role = request.headers['role'] || 'guest'
      const connParams = makeConnectionParams({token, role})
      return {
        connParams,
        currentUser,
        role,
        response,
        dev,
        urlMap,
        getApolloClient,
        ws: false,
        adminClients,
      }
    }
  }
}

function onConnect(connectionParams, websocket, context) {
  const {token, currentUser} = getCurrentUser({token: connectionParams['token']})
  const role = connectionParams['role'] || 'guest'

  const connParams = makeConnectionParams({token, role})

  let subscriptionClients = {
    reportingService: null,
    userService: null,
  }  
  
  if (currentUser.name !== 'Guest') {
    subscriptionClients = {
      reportingService: createWsClient('reportingService', { urlMap, connParams }),
      userService: createWsClient('userService', { urlMap, connParams }),
    }
  }

  return {
    ...context,
    currentUser,
    token,
    role,
    connParams,
    subscriptionClients,
  };
}

async function onDisconnect(websocket, context) {
  const params = await context.initPromise;
  const { subscriptionClients } = params;
  for (const key in subscriptionClients) {
    if (subscriptionClients[key]) {
      subscriptionClients[key].close();
    }
  }
}

function startServer(server, port = 3000) {
  server.start({
    port: process.env.PORT || port,
    endpoint: '/graphql',
    playground: '/playground',
    subscriptions: {
      path: '/subscriptions',
      onConnect,
      onDisconnect,
    }
  }, (options) => console.log(`Server is running on http://localhost:${port}`))
}
/*
const server = await createServer();
startServer(server);
*/
module.exports = {
  createServer,
  startServer
}