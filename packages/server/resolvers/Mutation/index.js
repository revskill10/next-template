const gql = require('graphql-tag')
const axios = require('axios');
const jwt = require('jsonwebtoken')
const { createLink } = require('../../create-link')
const { createApolloClient } = require('../../create-apollo-client')

const query1 = gql`
  query {
    users {
      id
      email
      info {
        user_id
        name
        roles
      }
    }
  }
`
const mutation1 = gql`
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

function createJwtToken({user_id, name, roles}){
  const data = {
    'name': name,
    "https://hasura.io/jwt/claims": {
      "x-hasura-allowed-roles": roles.push('user'),
      "x-hasura-default-role": "user",
      'x-hasura-user-id': user_id,
    }
  }
  return jwt.sign(data, process.env.JWT_SECRET);
}

function googleVerifyUri(id_token){
  return `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`
}

function query(client, query, variables){
  return client.query({query, variables})
}

function mutate(client, mutation, variables) {
  return client.mutate({mutation, variables})
}

async function login(parent, { id_token }, context, info) {
  const { data: { name, email, family_name, given_name, picture, sub } } = await axios.get(googleVerifyUri(id_token))
  const variables = { name, email, family_name, given_name, picture, googleId:sub }
  console.log(variables)
  
  const userLink = createLink(
    process.env.USER_SERVICE_GRAPHQL_URL, 
    process.env.USER_SERVICE_SUBSCRIPTION_URL, 
    'userService',
    context)
  const client = createApolloClient(userLink)
  
  const test = await mutate(client, mutation1, variables)
  const info1 = test.data.insert_users.returning[0].info
  if (info1) {
    const token = createJwtToken(info1)
    context.response.cookie('Authorization', `Bearer ${token}`, { maxAge: 900000, httpOnly: true });    
    return {
      token,
    }
  } else {
    const token = createJwtToken({
      user_id: test.data.insert_users.returning[0].id,
      roles: ["user"],
      name: test.data.insert_users.returning[0].name
    })
    context.response.cookie('Authorization', `Bearer ${token}`, { maxAge: 900000, httpOnly: true });
    return {
      token
    }
  }
}

module.exports = {
  login,
}