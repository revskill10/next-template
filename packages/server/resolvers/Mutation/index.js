const gql = require('graphql-tag')
const axios = require('axios');
const { 
  getUserClient,
  mutate,
  createJwtToken,
  googleVerifyUri, 
  setCookie,
  clearCookie,
  anonymousJwt,
  query,
  getCurrentUser,
} = require('../utils')

const upsertUserQuery = gql`
  mutation upsert_user($name:String!, $email:String!, $family_name:String,$given_name:String,$picture:String,$googleId:String!) {
    insert_users(
      objects: [
        {name: $name, email:$email, familyName:$family_name, givenName:$given_name,imageUrl:$picture,googleId:$googleId}
      ],
      on_conflict: {
        constraint: users_email_key,
        update_columns: [name, familyName, givenName, imageUrl]
      }
    ) {
      affected_rows
      returning{
        id
        name
        info{
          user_id
          name
          roles
        }
      }
    }
  }
`

function onLoginData(data, context) {
  let info1 = data.insert_users.returning[0].info
  if (info1) {
    const info2 = {
      user_id: info1.user_id,
      roles: info1.roles.concat(['user']),
      name: info1.name
    }
    const token = createJwtToken(info2)
    setCookie(context, token)
    return {
      token,
    }
  } else {
    const token = createJwtToken({
      user_id: data.insert_users.returning[0].id,
      roles: ["user"],
      name: test.data.insert_users.returning[0].name
    })
    setCookie(context, token)
    return {
      token,
    }
  }
}

function onLoginError(error, context) {
  const token = createJwtToken({
    user_id: process.env.GUEST_ID,
    roles: ["guest"],
    name: 'Guest'
  })
  setCookie(context, token)
  return {
    token,
  }
}

async function login(parent, { id_token }, context, info) {
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
  const variables = { name, email, family_name, given_name, picture, googleId:sub }

  return mutate({
    query: upsertUserQuery,
    variables,
    context,
    onData: onLoginData,
    onError: onLoginError
  }, getUserClient, true)
}

const userInfoQuery = gql`
  query UserInfo($userId:uuid!){
    user_info(where:{
      user_id:{
        _eq:$userId
      }
    }){
    	user_id
      name
      roles
    }
  }
`

function onRefreshData(data, context) {
  let token = null;
  if (data.user_info && data.user_info.length === 1) {
    const userInfo = data.user_info[0]
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
  const { user_id } =  getCurrentUser(context)
  const variables = { userId: user_id }
  return query({
    query: userInfoQuery,
    variables,
    context,
    onData: onRefreshData,
    onError: onRefreshError,
  }, getUserClient, true)
}

function logout(parent, { id_token }, context, info) {
  clearCookie(context)
  return true
}

module.exports = {
  login,
  logout,
  refresh,
}