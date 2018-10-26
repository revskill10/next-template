const {
  query,
  processRoles,
  getUserClient,
} = require('../utils')
const gql = require('graphql-tag')

const currentUserQuery = gql`
  query UserInfo {
    user_info {
      user_id
      name
      roles
    }
  }
`

function onCurrentUserData(data) {
  const info = data.user_info[0]
  return {
    user_id: info.user_id,
    roles: processRoles(info.roles),
    name: info.name,
  }
}

async function currentUser(parents, args, context, info) {
  return query({
    context,
    query: currentUserQuery,
    onData: onCurrentUserData,
  }, getUserClient)
}

module.exports = {
  currentUser,
}
