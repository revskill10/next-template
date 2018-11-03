const { createJwtToken } = require('./resolvers/utils')
const permissions = require('../lib/utils/guest-permissions')

function anonymousJwt() {
  return createJwtToken({
    user_id: process.env.GUEST_ID,
    roles: ["guest"],
    name: 'Guest',
    permissions,
  }, 'guest')
}

module.exports = anonymousJwt