const {
  subscribe,
  createJwtToken
} = require('../utils')
const {
  userInfoSubscription,
} = require('./index.gql')
const guestUser = require('../../guest-user')

function onSubscriptionData(data) {
  const currentUser = data.v_user_info[0]
  const me = {
    token: createJwtToken(currentUser),
    currentUser,
  }
  return {me}
}

function onSubscriptionError(error) {
  const currentUser = guestUser()
  me = {
    token: createJwtToken(currentUser),
    currentUser,
  }
  return {me}
}

async function currentUser(parents, args, context, info) {
  const { currentUser, adminClients } = context
  const variables = {
    userId: currentUser.user_id
  }
  return subscribe({
    context,
    query: userInfoSubscription,
    variables,
    onData: onSubscriptionData,
    onError: onSubscriptionError,
  }, adminClients['userService'])
}

module.exports = {
  me: {
    subscribe: currentUser,
  },
}
