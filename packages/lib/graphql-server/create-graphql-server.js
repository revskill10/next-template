const dotenv = require('dotenv')
const { GraphQLServer } = require('graphql-yoga')
const { mergeSchemas } = require('graphql-tools')
const { getRemoteSchema } = require('./get-remote-schema')
const { SubscriptionClient } = require('subscriptions-transport-ws/dist/client')
const WebSocket = require('ws')
dotenv.config()

async function createServer() {
  const reportingSchema = await getRemoteSchema(process.env.REPORTING_SERVICE_GRAPHQL_URL, process.env.REPORTING_SERVICE_SUBSCRIPTION_URL, 'reportingService');
  const userSchema = await getRemoteSchema(process.env.USER_SERVICE_GRAPHQL_URL, process.env.USER_SERVICE_SUBSCRIPTION_URL, 'userService');

  const schema = mergeSchemas({
    schemas: [userSchema, reportingSchema],
  });

  const server = new GraphQLServer({
    schema,
    introspection: true,
    playground: true,
    cors: {
      origin: "*",
      credentials: 'include',
    },
    
    context: function({connection, request}) {
      if (connection && connection.context) {
        return connection.context
      }
      if (request) {
        return {
          headers: request.headers
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
  const urlMaps = {
    reportingService: process.env.REPORTING_SERVICE_SUBSCRIPTION_URL,
    userService: process.env.USER_SERVICE_SUBSCRIPTION_URL,
  }

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