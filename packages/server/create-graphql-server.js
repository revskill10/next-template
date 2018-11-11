const { GraphQLServer, PubSub } = require('graphql-yoga')
const { mergeSchemas } = require('graphql-tools')
const { importSchema } = require('graphql-import')
const getCurrentUser = require('./get-current-user')
const { rule, shield, and, or, not } = require('graphql-shield')
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


const canViewReport = rule()(async function(parent, args, ctx, info) {
  return ctx.currentUser.roles.includes('staff')
})

const canAssignRoles = rule()(async function(parent, args, ctx, info) {
  return ctx.currentUser.roles.includes('admin')
})

const isAuthenticated = rule()(async function(parent, args, ctx, info) {
  return !ctx.currentUser.roles.includes('guest')
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
      Subscription: {
        me: { subscribe: {
          currentUser: isAuthenticated
        } }
      }
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
  return async function({connection, request, response}) {
    if (connection && connection.context) {
      const { connectionParams } = connection.context
      const {token, currentUser} = await getCurrentUser({token: connectionParams['token'], adminClients})
      return {
        ...connection.context,
        currentUser,
        token,
        pubsub,
        dev,
        urlMap,        
        adminClients,
        response: null,
        ws: true,
      }
    }
    if (request) {
      const {token, currentUser} = await getCurrentUser({token: request.headers['token'], adminClients})
      return {
        currentUser,
        token,
        pubsub,
        dev,
        urlMap,
        adminClients,
        response,
        ws: false,
      }
    }
  }
}

function onConnect(connectionParams, websocket, context) {
  return {
    ...context,
    connectionParams,
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
const webpush = require('web-push')
const dummyDb = { subscription: null } //dummy in memory store
async function saveToDatabase(subscription) {
  // Since this is a demo app, I am going to save this in a dummy in memory store. Do not do this in your apps.
  // Here you should be writing your db logic to save it.
  dummyDb.subscription = subscription
}

const vapidKeys = {
  publicKey: process.env.WEB_PUSH_PUBLIC_KEY,
  privateKey: process.env.WEB_PUSH_PRIVATE_KEY,
}
//setting our previously generated VAPID keys
webpush.setVapidDetails(
  'mailto:myuserid@email.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

//function to send the notification to the subscribed device
const sendNotification = (subscription, dataToSend) => {
  webpush.sendNotification(subscription, dataToSend)
}
function startServer(server, port = 3000) {
  server.use(bodyParser.json())

  // The new /save-subscription endpoint
  server.post('/save-subscription', async function(req, res){
    const subscription = req.body
    await saveToDatabase(subscription) //Method to save the subscription to Database
    res.json({ message: 'success' })
  })
  
  server.get('/send-notification', function(req, res) {
    const subscription = dummyDb.subscription //get subscription from your databse here.
    if (subscription) {
      const message = 'Hello World'
      sendNotification(subscription, message)
      res.json({ message: 'message sent' })
    } else {
      res.json( {error: 'nothing'})
    }
  })

  server.start({
    port: process.env.PORT || port,
    endpoint: '/graphql',
    playground: '/playground',
    subscriptions: {
      path: '/subscriptions',
      onConnect,
      onDisconnect,
    }
  }, (options) => {
    console.log(`Server is running on http://localhost:${port}`)
    const maxListenersExceededWarning = require('max-listeners-exceeded-warning');
    maxListenersExceededWarning();
    }
  )
}
/*
const server = await createServer();
startServer(server);
*/
module.exports = {
  createServer,
  startServer
}