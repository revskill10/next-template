const isAllowed = require('./is-allowed')

function makeResolver({allowedPermissions, accessCheck, remote = false}) {
  if (remote === false) {
    return async (root, args, {currentUser}, info) => {
      if (!isAllowed({currentUser, allowedPermissions, accessCheck, args})) {
        return new Error('Forbidden')
      }
    }
  } else {
    return async (root, args, {currentUser}, info) => {
      return isAllowed({currentUser, allowedPermissions, accessCheck, args})
    }
  }
}

module.exports = makeResolver
