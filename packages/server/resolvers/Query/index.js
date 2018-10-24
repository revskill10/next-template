const { getCurrentUser } = require('../utils')

function currentUser(parent, args, context, info) {
  return getCurrentUser(context)
}

module.exports = {
  currentUser,
}
