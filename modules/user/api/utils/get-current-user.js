const jwt = require('jsonwebtoken')
const {inspect} = require('util')
const {createJwtToken} = require('../../../core/api/utils')
const {userInfoQuery} = require('./get-current-user.gql')
function getCurrentUser(adminClients) {
  return async function verifyToken({token}) {
    try {
      const currentUser = jwt.verify(token, process.env.JWT_SECRET)
      return {
        currentUser,
        token,
      }
    } catch (e) {
      const variables = {
        userId: process.env.GUEST_ID,
      }
      try {
        const {data} = await adminClients['userService'].query({query: userInfoQuery, variables})
        const currentUser = data.v_user_info[0]
        return {
          token: createJwtToken(currentUser),
          currentUser,
        }
      } catch (e) {
        return {
          token: null,
          currentUser: null,
        }
      }
    }
  }
}

module.exports = getCurrentUser