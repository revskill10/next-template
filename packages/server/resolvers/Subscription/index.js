const {
  getUserClient
} = require('../utils')
const { inspect } = require('util')
const gql = require('graphql-tag')

async function currentUser(parents, args, context, info) {
  const {
    pubsub,
    token
  } = context
  const channel = token
  console.log(`channel ${token}`)

  const apolloClient = getUserClient(context)

  apolloClient.subscribe({
    query: gql`
      subscription UserInfo {
        user_info {
          user_id
          name
          roles
        }
      }`,
    variables: {}
  }).subscribe({
    next ({ data }) {
      console.log(`Data: ${inspect(data)}`)
      pubsub.publish( channel , {
        currentUser: data.user_info[0]
      })
    }
  });

  return pubsub.asyncIterator(channel)
}

module.exports = {
  currentUser: {
    subscribe: currentUser,
  },
}
