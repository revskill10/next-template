const gql = require('graphql-tag')
const axios = require('axios');
const { 
  getUserClient,
  mutate,
  createJwtToken,
  googleVerifyUri, 
  setCookie,
  clearCookie,
} = require('../utils')

const upsertUser = gql`
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
  
  const client = getUserClient(context, true)
  
  const test = await mutate(client, upsertUser, variables)
  if (test.data) {
    let info1 = test.data.insert_users.returning[0].info
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
        user_id: test.data.insert_users.returning[0].id,
        roles: ["user"],
        name: test.data.insert_users.returning[0].name
      })
      setCookie(context, token)
      return {
        token
      }
    }
  } else {
    const token = createJwtToken({
      user_id: null,
      roles: ["anonymous"],
      name: 'Anonymous'
    })
    setCookie(context, token)
    return {
      token,
    }
  }
}

function logout(parent, { id_token }, context, info) {
  clearCookie(context)
  return true
}

module.exports = {
  login,
  logout,
}