const ApolloClient = require('apollo-client').default;
const { InMemoryCache } = require('apollo-cache-inmemory')

function createApolloClient({link, adminLink}, admin) {
  const cache = new InMemoryCache()
  if (admin) {
    return new ApolloClient({
      link: adminLink,
      cache,
    })
  } else {
    return new ApolloClient({
      link,
      cache,
    })
  }
}

module.exports = {
  createApolloClient,
}