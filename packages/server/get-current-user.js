const jwt = require('jsonwebtoken')
const anonymousJwt = require('./anonymous-jwt')
const guestUser = require('./guest-user')

function verifyToken({token}) {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET)
    const currentUser = {
      user_id: data['https://hasura.io/jwt/claims']['x-hasura-user-id'],
      name: data.name,
      roles: data['https://hasura.io/jwt/claims']['x-hasura-allowed-roles'],
      permissions: data['https://hasura.io/jwt/claims']['x-hasura-allowed-permissions'],
    }
    return {
      currentUser,
      token,
    }
  } catch (_e) {
    return { 
      currentUser: guestUser(), 
      token: anonymousJwt(),
    }
  }
}

module.exports = verifyToken