const dotenv = require('dotenv')
dotenv.config()
const { GraphQLServer, PubSub } = require('graphql-yoga')
const { mergeSchemas } = require('graphql-tools')
const { importSchema } = require('graphql-import')
const { getRemoteSchema } = require('./get-remote-schema')
const { SubscriptionClient } = require('subscriptions-transport-ws/dist/client')
const WebSocket = require('ws')

function isJsonReq(req) {
  const contype = req.headers['content-type'];
  return (contype && contype.indexOf('application/json') === 0)
}
async function createServer() {
  const { 
  //  reportingLink, 
    userLink,
    cmsLink,
  } = require('./create-link')

 // const reportingSchema = await getRemoteSchema(reportingLink)
  const userSchema = await getRemoteSchema(userLink)
  const cmsSchema = await getRemoteSchema(cmsLink)
  const localSchema = importSchema(__dirname + '/typedefs/schema.graphql')
  const resolvers = require('./resolvers')
  const schema = mergeSchemas({
    schemas: [
      userSchema, 
 //     reportingSchema,
      cmsSchema,
      localSchema,
    ],
    resolvers
  });

  const pubsub = new PubSub()

  const server = new GraphQLServer({
    schema,
    introspection: true,
    playground: true,
    cors: {
      origin: "*",
      credentials: 'include',
    },
    
    context: function({connection, request, response}) {
      if (connection && connection.context) {
        return {
          ...connection.context,
          pubsub,
          schema,
        }
      }
      if (request) {
        console.log(request.headers)
        return {
          headers: request.headers,
          cookies: request.cookie,
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
        const { 
          anonymousJwt,
        } = require('./create-link')

        const token = connectionParams['token'] || anonymousJwt()

        const connParams = {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }

        return {
          token,
          subscriptionClients: {
            //reportingService: createWsClient(process.env.REPORTING_SERVICE_SUBSCRIPTION_URL, connParams),
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