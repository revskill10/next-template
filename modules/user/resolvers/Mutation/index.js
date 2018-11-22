const axios = require('axios');
const { 
  mutate,
  createJwtToken,
  googleVerifyUri, 
  setCookie,
  clearCookie,
  query,
} = require('../../../core/utils')
const  {
  upsertUserQuery,
  userInfoQuery,
  assignRolesMutation,
  assignPermissionsMutation,
  logoutMutation,
} = require('./index.gql')
const { inspect } = require('util')

function onLoginData(data, context) {  
  let info1 = data.insert_users.returning[0].info
  const token = createJwtToken(info1)
  setCookie(context, token)
  return {
    token,
  }  
}

function onLoginError(error, context) {
  console.log(inspect(error))
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
  const variables = { name, email, family_name, given_name, picture, googleId:sub, active: true }
  return mutate({
    query: upsertUserQuery,
    variables,
    context,
    onData: onLoginData,
    onError: onLoginError
  }, adminClients['userService'])
}

async function refresh(parent, args, context, info) {
  const { token } =  context
  
  setCookie(context, token)
  return {
    token
  }
}

async function refreshCookies(parent, { token }, context, info) {
  const {adminClients, getCurrentUser}= context
  const res = await getCurrentUser({token})
  setCookie(context, token)
  return res
}

async function logout(parent, { id_token }, context, info) {
  const { currentUser, adminClients } = context
  const variables = {
    userId: currentUser.user_id,
  }
  await mutate({
    query: logoutMutation,
    variables,
    context,
  }, adminClients['userService'])
  clearCookie(context)
  return true
}

function onAssignRolesError(error, context) {
  return false
}

function onAssignRolesData(data, context) {
  if (data) {
    return true
  } else {
    return false
  }  
}

async function assignRoles(_, {user_id, role_ids}, context) {
  const { adminClients } = context
  const input = role_ids.map(function(role_id) {
    return {
      user_id,
      role_id,
    }
  })
  const variables = {
    user_id,
    role_ids,
    input,
  }
  return mutate({
    query: assignRolesMutation,
    variables,
    context,
    onError: onAssignRolesError,
    onData: onAssignRolesData,
  }, adminClients['userService'])
}

// permissions


function onAssignPermissionsError(error, context) {
  return false
}

function onAssignPermissionsData(data, context) {
  if (data) {
    return true
  } else {
    return false
  }  
}

async function assignPermissions(_, {role_id, permission_ids}, context) {
  const { adminClients } = context
  const input = permission_ids.map(function(permission_id) {
    return {
      role_id,
      permission_id,
    }
  })
  const variables = {
    role_id,
    permission_ids,
    input,
  }
  return mutate({
    query: assignPermissionsMutation,
    variables,
    context,
    onError: onAssignPermissionsError,
    onData: onAssignPermissionsData,
  }, adminClients['userService'])
}

module.exports = {
  login,
  logout,
  refresh,
  refreshCookies,
  assignRoles,
  assignPermissions,
}
