const {
  subscribe,
  processRoles,
  getUserClient,
} = require('../utils')
const gql = require('graphql-tag')

const query = gql`
  subscription UserInfo {
    user_info {
      user_id
      name
      roles
    }
  }
`

function onSubscriptionData(data) {
  const info = data.user_info[0]
  return {
    currentUser: {
      user_id: info.user_id,
      roles: processRoles(info.roles),
      name: info.name,
    }
  }
}

async function currentUser(parents, args, context, info) {
  return subscribe({
    context,
    query,
    onData: onSubscriptionData,
  }, getUserClient)
}

module.exports = {
  currentUser: {
    subscribe: currentUser,
  },
}
