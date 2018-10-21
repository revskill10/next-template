const { HttpLink } = require('apollo-link-http')
const { getMainDefinition } = require('apollo-utilities')
const { setContext } = require('apollo-link-context')
const fetch = require('node-fetch')
const { onError } = require('apollo-link-error')
const { ApolloLink, split } = require('apollo-link')

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

  const wsLink = createWsLink(clientName, graphqlContext)
  
  const errorLink = onError(function({ graphQLErrors, networkError }) {
    if (graphQLErrors)
      graphQLErrors.map(function({ message, locations, path }) {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      }
    );
    if (networkError) {
      //console.log(`[Network error]: ${inspect(networkError)}`);
    }
  });

  const contextLink = setContext(function(_request, previousContext) {
    const { isJson, headers, cookies } = graphqlContext || previousContext.graphqlContext
    if (isJson) {
      return {
        headers: {
          authorization: headers.authorization,
        }
      }
    } else {
      return {
        headers: {
          authorization: cookies['Authorization']
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
   
  const link = split(
    function({ query }) {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    },
    errorLink.concat(wsLink),
    contextLink.concat(errorLink.concat(httpLink)),
  );

  const adminLink = adminContextLink.concat(httpLink)
  return {
    adminLink,
    link
  }
}

module.exports = {
  createLink
}
