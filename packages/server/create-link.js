const { HttpLink } = require('apollo-link-http')
const { getMainDefinition } = require('apollo-utilities')
const { setContext } = require('apollo-link-context')
const fetch = require('node-fetch')
const { onError } = require('apollo-link-error')
const { ApolloLink, split } = require('apollo-link')
const { inspect } = require('util')
const { createJwtToken } = require('./resolvers/utils')

function anonymousJwt() {
  return createJwtToken({
    user_id: process.env.GUEST_ID,
    roles: ["guest"],
    name: 'Guest'
  }, 'guest')
}

function createWsLink(clientName, graphqlContext) {
  return new ApolloLink(function(operation, forward) {
    if (graphqlContext) {
      const { subscriptionClients } = graphqlContext;
      return subscriptionClients 
        && subscriptionClients[clientName] 
        && subscriptionClients[clientName].request(operation);
    } else {
      const context = operation.getContext();
      const { graphqlContext: { subscriptionClients } } = context;
      return subscriptionClients 
        && subscriptionClients[clientName] 
        && subscriptionClients[clientName].request(operation);
    }
  })
}

function createLink(uri, subUri, clientName, graphqlContext){
  const httpLink = new HttpLink({ uri, fetch, credentials: 'include' });
  let wsLink = null

  if (subUri) {
    wsLink = createWsLink(clientName, graphqlContext)
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

  const contextLink = setContext(function(_request, previousContext) {
    const { isJson, headers, cookies } = graphqlContext || previousContext.graphqlContext
    let token = anonymousJwt()
    
    if (isJson) {
      return {
        headers: {
          authorization: headers.authorization ? headers.authorization : `Bearer ${token}`,
        }
      }
    } else {
      if (cookies && cookies['token']) {
        token = cookies['token']
      }
      return {
        headers: {
          authorization: `Bearer ${token}`,
        }
      }
    }
  });

  const adminContextLink = setContext(function(_request, previousContext){
    return {
      headers: {
        ['X-Hasura-Access-Key']: process.env.HASURA_ACCESS_KEY,
      }
    }
  })
   

  const link = wsLink ? split(
    function({ query }) {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    },
    errorLink.concat(wsLink),
    errorLink.concat(contextLink.concat(httpLink)),
  ) : errorLink.concat(contextLink.concat(httpLink))

  const adminLink = adminContextLink.concat(httpLink)
  return {
    adminLink,
    link
  }
}

const reportingLink = createLink(
  process.env.REPORTING_SERVICE_GRAPHQL_URL, 
  process.env.REPORTING_SERVICE_SUBSCRIPTION_URL, 
  'reportingService'
)
const userLink = createLink(
  process.env.USER_SERVICE_GRAPHQL_URL, 
  process.env.USER_SERVICE_SUBSCRIPTION_URL, 
  'userService')

const cmsLink = createLink(
  process.env.CMS_GRAPHQL_URL,
  null,
  'cmsService'
)

module.exports = {
  createLink,
  reportingLink,
  userLink,
  cmsLink,
  anonymousJwt,
}
