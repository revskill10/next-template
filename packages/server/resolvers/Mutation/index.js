const axios = require('axios');
const { 
  mutate,
  createJwtToken,
  googleVerifyUri, 
  setCookie,
  clearCookie,
  query,
} = require('../utils')
const anonymousJwt = require('../../anonymous-jwt')

const  {
  upsertUserQuery,
  userInfoQuery,
  setOnlineStatusMutation,
} = require('./index.gql')

function onLoginData(data, context) {
  let info1 = data.insert_users.returning[0].info
  const token = createJwtToken(info1)
  setCookie(context, token)
  return {
    token,
  }
}

function onLoginError(error, context) {
}

async function login(parent, { id_token }, context, info) {
  const { adminClients } = context
  const { 
    data: { 
      name, 
      email, 
      family_name, 
      given_name, 
      picture, 
      sub 
    } 
  } = await axios.get(googleVerifyUri(id_token))
  const variables = { name, email, family_name, given_name, picture, googleId:sub, roleId: process.env.USER_ROLE_ID }

  return mutate({
    query: upsertUserQuery,
    variables,
    context,
    onData: onLoginData,
    onError: onLoginError
  }, adminClients['userService'])
}

function onRefreshData(data, context) {
  let token = null;
  if (data.v_user_info && data.v_user_info.length === 1) {
    const userInfo = data.v_user_info[0]
    token = createJwtToken(userInfo)
  } else {
    token = anonymousJwt()
  }
  setCookie(context, token)
  return { token }
}

function onRefreshError(error, context) {
  const token = anonymousJwt();
  setCookie(context, token)
  return { token }
}

async function refresh(parent, args, context, info) {
  const { currentUser, adminClients } =  context
  const variables = { userId: currentUser.user_id }
  return query({
    query: userInfoQuery,
    variables,
    context,
    onData: onRefreshData,
    onError: onRefreshError,
  }, adminClients['userService'])
}



async function logout(parent, { id_token }, context, info) {
  const { currentUser, adminClients } = context
  const variables = {
    userId: currentUser.user_id,
    active: false,
  }
  await mutate({
    query: setOnlineStatusMutation,
    variables,
    context,
  }, adminClients['userService'])
  clearCookie(context)
  return true
}

module.exports = {
  login,
  logout,
  refresh,
}