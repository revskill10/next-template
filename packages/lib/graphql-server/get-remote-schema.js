const { HttpLink } = require('apollo-link-http')
const { split } = require('apollo-client-preset')
const { getMainDefinition } = require('apollo-utilities')
const { setContext } = require('apollo-link-context')
const fetch = require('node-fetch')
const { introspectSchema, makeRemoteExecutableSchema } = require('graphql-tools')
const { onError } = require('apollo-link-error')
const { ApolloLink } = require('apollo-link')

function createWsLink(clientName) {
  return new ApolloLink(function(operation, forward) {
    const context = operation.getContext();
    const { graphqlContext: { subscriptionClients } } = context;
    return subscriptionClients 
      && subscriptionClients[clientName] 
      && subscriptionClients[clientName].request(operation);
  })
}

async function getRemoteSchema (uri, subUri, clientName) {
  const httpLink = new HttpLink({ uri, fetch, credentials: 'include' });

  const wsLink = createWsLink(clientName)
  
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

  const schemaContextLink = setContext(function(_request, previousContext){
    return {
      headers: {
        ['X-Hasura-Access-Key']: process.env.HASURA_ACCESS_KEY,
      }
    }
  })

  const contextLink = setContext(function(_request, previousContext) {
    const contextHeaders = previousContext.graphqlContext.headers
    return {
      headers: {
        authorization: contextHeaders.authorization,
      }
    } 
  });
   
  const link = split(
    function({ query }) {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    },
    errorLink.concat(wsLink),
    contextLink.concat(errorLink.concat(httpLink)),
  );
  const schema = await introspectSchema(schemaContextLink.concat(httpLink));

  const executableSchema = makeRemoteExecutableSchema({
    schema,
    link,
  });

  return executableSchema;
}

module.exports = {
  getRemoteSchema
}