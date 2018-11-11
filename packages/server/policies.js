const isAdmin = (currentUser) => {
  return currentUser.roles.includes('admin')
}
const canSubscribeMe = (root, args, {currentUser}, info) => {
  if (!isAdmin(currentUser)) {
    return new Error('Forbidden')
  }
}
const canAssignRoles = (root, args, {currentUser}, info) => {
  if (!isAdmin(currentUser)) {
    return new Error('Forbidden')
  }
}
const canAssignPermissions = (root, args, {currentUser}, info) => {
  if (!isAdmin(currentUser)) {
    return new Error('Forbidden')
  }
}

module.exports = {
  canSubscribeMe,
  canAssignRoles,
  canAssignPermissions,
}
