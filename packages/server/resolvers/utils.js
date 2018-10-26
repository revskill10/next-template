const { createApolloClient } = require('../create-apollo-client')
const jwt = require('jsonwebtoken')

function getUserClient(context, admin) {
  const { createLink } = require('../create-link')
  const userLink = createLink(
    process.env.USER_SERVICE_GRAPHQL_URL, 
    process.env.USER_SERVICE_SUBSCRIPTION_URL, 
    'userService',
    context)
  return createApolloClient(userLink, admin)
}

async function query({variables = {}, query, context, onData, onError }, getClient, isAdmin = false){
  const client = getClient(context, isAdmin)
  try {
    const res = await client.query({query, variables})
    if (onData && typeof(onData) === 'function') {
      return onData(res.data, context)
    } else {
      return res.data
    }
  } catch (error) {
    return onError(error, context)
  }
}

async function mutate({variables = {}, query, context, onData, onError }, getClient, isAdmin = false){
  const client = getClient(context, isAdmin)
  try {
    const res = await client.mutate({mutation: query, variables})
    if (onData && typeof(onData) === 'function') {
      return onData(res.data, context)
    } else {
      return res.data
    }    
  } catch (error) {
    return onError(error, context)
  }
}

function subscribe({variables = {}, query, context, onData }, getClient, isAdmin = false) {
  const { 
    pubsub,
    token,
  } = context
  const apolloClient = getClient(context, isAdmin)
  apolloClient.subscribe({
    query,
    variables,
  }).subscribe({
    next ({ data }) {
      pubsub.publish(
        token, 
        onData(data, context)
      )
    }
  });
  return pubsub.asyncIterator(token)
}

function hasRole(roles, role) {
  return roles.includes(role)
}

function processRoles(roles) {
  let allowedRoles = roles
  if (!hasRole(roles, 'user') && !hasRole(roles, 'guest')) {
    allowedRoles.push('user')
  }

  if (roles.includes('guest')) {
    allowedRoles = ['guest']
  }
  return allowedRoles
}

function createJwtToken({user_id, name, roles}, defaultRole = 'user'){
  const data = {
    'name': name,
    'https://hasura.io/jwt/claims': {
      "x-hasura-allowed-roles": processRoles(roles),
      "x-hasura-default-role": defaultRole,
      'x-hasura-user-id': user_id,
    }
  }
  return jwt.sign(data, process.env.JWT_SECRET);
}

function googleVerifyUri(id_token){
  return `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`
}

function setCookie(context, token) {
  context.response.cookie('token', token, { maxAge: 900000, httpOnly: true });    
}

function clearCookie(context) {
  context.response.clearCookie('token')
}

function getCurrentUser(context) {
  const { isJson, headers, cookies } = context
  
  try {
    if (isJson) {
      const token = headers.authorization.split(' ')[1]
      const data = jwt.verify(token, process.env.JWT_SECRET)
      return {
        user_id: data['https://hasura.io/jwt/claims']['x-hasura-user-id'],
        name: data.name,
        roles: data['https://hasura.io/jwt/claims']['x-hasura-allowed-roles']
      }
    } else {
      const token = cookies['token']
      const data = jwt.verify(token, process.env.JWT_SECRET)
      return {
        user_id: data['https://hasura.io/jwt/claims']['x-hasura-user-id'],
        name: data.name,
        roles: data['https://hasura.io/jwt/claims']['x-hasura-allowed-roles']
      }
    }
  } catch (_e) {
    return {
      user_id: process.env.GUEST_ID,
      name: 'Guest',
      roles: ['guest'],
    }
  }
}


module.exports = {
  getCurrentUser,
  getUserClient,
  query,
  mutate,
  subscribe,
  createJwtToken,
  googleVerifyUri,
  setCookie,
  clearCookie,
  processRoles,
}