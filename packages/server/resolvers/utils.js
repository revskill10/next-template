const { createLink } = require('../create-link')
const { createApolloClient } = require('../create-apollo-client')
const jwt = require('jsonwebtoken')

function getUserClient(context, admin) {
  const userLink = createLink(
    process.env.USER_SERVICE_GRAPHQL_URL, 
    process.env.USER_SERVICE_SUBSCRIPTION_URL, 
    'userService',
    context)
  return createApolloClient(userLink, admin)
}

function query(client, query, variables){
  return client.query({query, variables})
}

function mutate(client, mutation, variables) {
  return client.mutate({mutation, variables})
}

function createJwtToken({user_id, name, roles}){
  const defaultRole = user_id ? 'user' : 'anonymous'
  const data = {
    'name': name,
    'https://hasura.io/jwt/claims': {
      "x-hasura-allowed-roles": roles,
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
      user_id: null,
      name: 'Anonymous',
      roles: ['anonymous'],
    }
  }
}

module.exports = {
  getUserClient,
  query,
  mutate,
  createJwtToken,
  googleVerifyUri,
  setCookie,
  clearCookie,
  getCurrentUser,
}