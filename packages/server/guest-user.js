const permissions = require('../lib/utils/guest-permissions')

function guestUser() {
  return {
    user_id: process.env.GUEST_ID,
    name: 'Guest',
    roles: ['guest'],
    permissions,
    status: [
      { active: false }
    ]
  }
}

module.exports = guestUser
