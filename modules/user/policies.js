const isAdmin = (currentUser) => {
  return currentUser.roles.includes('admin')
}

const isAuthenticated = async function(parent, args, ctx, info) {
  return !ctx.currentUser.roles.includes('guest')
}

function _subscribeMe(currentUser){
  return isAdmin(currentUser)
}

function _assignRoles(currentUser) {
  return isAdmin(currentUser)
}

function _assignPermissions(currentUser) {
  return isAdmin(currentUser)
}

function _refreshCookies(currentUser) {
  return !!currentUser
}

module.exports = {
  _subscribeMe,
  _assignRoles,
  _assignPermissions,
  _refreshCookies,
}
