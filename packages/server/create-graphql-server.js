const dotenv = require('dotenv')
const { GraphQLServer } = require('graphql-yoga')
const { mergeSchemas } = require('graphql-tools')
const { getRemoteSchema } = require('./get-remote-schema')
const { SubscriptionClient } = require('subscriptions-transport-ws/dist/client')
const WebSocket = require('ws')
const { createLink } = require('./create-link')
dotenv.config()


function isJsonReq(req) {
  const contype = req.headers['content-type'];
  return (contype && contype.indexOf('application/json') === 0)
}

async function createServer() {
  const reportingLink = createLink(
    process.env.REPORTING_SERVICE_GRAPHQL_URL, 
    process.env.REPORTING_SERVICE_SUBSCRIPTION_URL, 
    'reportingService'
  )
  const userLink = createLink(
    process.env.USER_SERVICE_GRAPHQL_URL, 
    process.env.USER_SERVICE_SUBSCRIPTION_URL, 
    'userService')

  const reportingSchema = await getRemoteSchema(reportingLink)
  const userSchema = await getRemoteSchema(userLink)
  const customSchema = `
  type AuthPayload {
    token: String
  }
  
  type Mutation {
    login(id_token: String!): AuthPayload
  }
  `
  const resolvers = require('./resolvers')
  const schema = mergeSchemas({
    schemas: [
      userSchema, 
      reportingSchema,
      customSchema,
    ],
    resolvers
  });

  const server = new GraphQLServer({
    schema,
    introspection: true,
    playground: true,
    /*
    cors: {
      origin: "*",
      credentials: 'include',
    },
    */
    
    context: function({connection, request, response}) {
      if (connection && connection.context) {
        return connection.context
      }
      if (request) {
        return {
          headers: request.headers,
          cookies: request.cookies,
          isJson: isJsonReq(request),
          response,         
        }
      }
    },
  });

  return server;
}

function createWsClient(subUrl, connectionParams) {
  return new SubscriptionClient(subUrl, {
    connectionParams,
    reconnect: true,
  }, WebSocket)
}

function startServer(server, port = 3000) {
  server.start({
    port: process.env.PORT || port,
    endpoint: '/graphql',
    playground: '/playground',
    subscriptions: {
      path: '/subscriptions',
      onConnect: function(connectionParams, websocket, context) {
        const connParams = {
          headers: {
            "Authorization": connectionParams['Authorization'],
            "Content-Type": "application/json"
          }
        }
        return {
          subscriptionClients: {
            reportingService: createWsClient(process.env.REPORTING_SERVICE_SUBSCRIPTION_URL, connParams),
            userService: createWsClient(process.env.USER_SERVICE_SUBSCRIPTION_URL, connParams),
          },
        };
      },
      onDisconnect: async function(websocket, context) {
        const params = await context.initPromise;
        const { subscriptionClients } = params;
        for (const key in subscriptionClients) {
          subscriptionClients[key].close();
        }
      }
    }
    
  }, (options) => console.log('Server is running on http://localhost:4000'))
}
/*
const server = await createServer();
startServer(server);
*/
module.exports = {
  createServer,
  startServer
}