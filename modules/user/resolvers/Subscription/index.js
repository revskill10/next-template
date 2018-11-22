const {
  subscribe,
  createJwtToken
} = require('../../../core/utils')
const {
  userInfoSubscription,
} = require('./index.gql')

const equal = require('fast-deep-equal');

function onSubscriptionData(data, { currentUser, token }) {
  const newUser = data.v_user_info[0]
  if (!equal(newUser, currentUser)) {
    const me = {
      token: createJwtToken(newUser),
      currentUser: newUser,
    }
    return {me}
  } else {
    return {
      me: {
        token,
        currentUser,
      }
    }
  }
  
}

function onSubscriptionError(error) {
  const me = null
  return {me}
}

async function me(parents, args, context, info) {
  const { currentUser, adminClients, pusher, pubsub, token } = context
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
    subscribe: me
  }
}
