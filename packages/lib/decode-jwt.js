import permissions from 'lib/guest-permissions'
import jwt from 'jsonwebtoken'

function guestUser() {
  return {
    name: 'Guest',
    roles: ['guest'],
    permissions,
  }
}

function decodeJwt({token}) {
  try {
    const data = jwt.decode(token)
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
      token: null,
    }
  }
}

export default decodeJwt