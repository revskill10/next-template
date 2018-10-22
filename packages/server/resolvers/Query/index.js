const { getCurrentUser } = require('../../create-link')

async function currentUser(parent, args, context, info) {
  return getCurrentUser(context)
}

module.exports = {
  currentUser,
}
