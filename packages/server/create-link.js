const { HttpLink } = require('apollo-link-http')
const { getMainDefinition } = require('apollo-utilities')
const { setContext } = require('apollo-link-context')
const fetch = require('node-fetch')
const { onError } = require('apollo-link-error')
const { ApolloLink, split } = require('apollo-link')
const ApolloClient = require('apollo-client').default
const { InMemoryCache } = require('apollo-cache-inmemory')
const { SubscriptionClient } = require('subscriptions-transport-ws/dist/client')
const WebSocket = require('ws')
const { inspect } = require('util')

function createWsLink(clientName) {
  return new ApolloLink(function(operation, forward) {
    const context = operation.getContext();
    const { graphqlContext: { subscriptionClients } } = context;
    return subscriptionClients 
      && subscriptionClients[clientName] 
      && subscriptionClients[clientName].request(operation);
  })
}

function createWsAdminLink(clientName, graphqlContext) {
  return new ApolloLink(function(operation, forward) {
    const { subscriptionClients } = graphqlContext;
    return subscriptionClients 
      && subscriptionClients[clientName] 
      && subscriptionClients[clientName].request(operation);
  })
}

const errorLink = onError(function({ graphQLErrors, networkError }) {
  if (graphQLErrors)
    graphQLErrors.map(function({ message, locations, path }) {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    }
  );
  if (networkError) {
    console.log(`[Network error]: ${inspect(networkError)}`);
  }
});

function makeHttpLink(clientName, {urlMap}) {
  return new HttpLink({ uri: urlMap[clientName].uri, fetch, credentials: 'include' });
}

function makeContextLink(context) {
  return setContext(function(_request, previousContext) {
    const { connParams } = context || previousContext.graphqlContext
    return connParams
  });
} 

function isSubscriptionOperation({ query }) {
  const definition = getMainDefinition(query);
  return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
}

function createLink(clientName, context){  
  const httpLink = makeHttpLink(clientName, context)
  const contextLink = makeContextLink()
  const finalHttpLink = errorLink.concat(contextLink.concat(httpLink))
  const wsLink = context.ws ? createWsLink(clientName) : null
  const finallWsLink = wsLink ? errorLink.concat(contextLink.concat(wsLink)) : null
  const finalLink = finallWsLink ? split(
    isSubscriptionOperation,
    finallWsLink,
    finalHttpLink
  ) : finalHttpLink

  return {
    link: finalLink,
  }
}

function createAdminLink(clientName, context){  
  const httpLink = makeHttpLink(clientName, context)
  const contextLink = makeContextLink(context)
  const finalHttpLink = errorLink.concat(contextLink.concat(httpLink))
  const wsLink = createWsAdminLink(clientName, context)
  const finallWsLink = errorLink.concat(wsLink)
  const finalLink = split(
    isSubscriptionOperation,
    finallWsLink,
    finalHttpLink
  )

  return {
    link: finalLink,
  }
}

function createWsClient(clientName, context) {
  const { urlMap, connParams } = context
  const subUrl = urlMap[clientName].subUri
  return new SubscriptionClient(subUrl, {
    connectionParams: connParams,
    reconnect: true,
  }, WebSocket)
}

function getApolloClient({link}) {
  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  })
}

function createAdminContext(clientName, context) {
  const { urlMap } = context
  const connParams = {
    headers: urlMap[clientName].headers
  }
  
  return {
    connParams,
    urlMap,
    admin: true,
  }
}

function makeConnectionParams({token, role}) {
  return {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-Hasura-Role": role,
    }
  }
}

module.exports = {
  createLink,
  getApolloClient,
  makeConnectionParams,
  createWsClient,
  createAdminContext,
  createAdminLink,
}
