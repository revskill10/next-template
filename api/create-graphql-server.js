const { GraphQLServer, PubSub } = require('graphql-yoga')
const bodyParser = require('body-parser')

async function createServer({dev, schema, adminClients, getCurrentUser}) {
  const pubsub = new PubSub()

  const server = new GraphQLServer({
    schema,
    introspection: true,
    playground: true,
    cors: {
      origin: "*",
      credentials: 'include',
    },
    context: context({pubsub, dev, adminClients, getCurrentUser}),    
  });

  return server;
}

function context({dev, pubsub, adminClients, getCurrentUser}) {
  return async function({connection, request, response}) {
    if (connection && connection.context) {
      const { connectionParams } = connection.context
      const {token, currentUser} = await getCurrentUser({token: connectionParams['token']})
      return {
        ...connection.context,
        currentUser,
        token,
        pubsub,
        dev,
        adminClients,
        response: null,
        ws: true,
        getCurrentUser,
      }
    }
    if (request) {
      const {token, currentUser} = await getCurrentUser({token: request.headers['token']})
      return {
        currentUser,
        token,
        pubsub,
        dev,
        adminClients,
        response,
        ws: false,
        getCurrentUser,
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