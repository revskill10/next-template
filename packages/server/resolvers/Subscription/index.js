const {
  getUserClient
} = require('../utils')
const { inspect } = require('util')
const gql = require('graphql-tag')
const { processRoles } = require('../utils')

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
      const info = data.user_info[0]
      pubsub.publish( channel , {
        currentUser: {
          user_id: info.user_id,
          roles: processRoles(info.roles),
          name: info.name,
        }
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
