const ApolloClient = require('apollo-client').default;
const { InMemoryCache } = require('apollo-cache-inmemory')

function createApolloClient({link}) {
  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  })
}

module.exports = {
  createApolloClient,
}