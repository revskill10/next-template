const {allow, VIEW_QLGD_REPORT} = require('./packages/lib/policies')

const isAdmin = (currentUser) => {
  return currentUser.roles.includes('admin')
}
const canSubscribeMe = async (root, args, {currentUser}, info) => {
  if (!isAdmin(currentUser)) {
    return new Error('Forbidden')
  }
}
const canAssignRoles = async (root, args, {currentUser}, info) => {
  if (!isAdmin(currentUser)) {
    return new Error('Forbidden')
  }
}
const canAssignPermissions = async(root, args, {currentUser}, info) => {
  if (!isAdmin(currentUser)) {
    return new Error('Forbidden')
  }
}

const canRefreshCookies = async (root, args, {currentUser}, info) => {
  if (!currentUser) {
    return new Error('Forbidden')
  }
}

const canViewReport = async function(parent, args, {currentUser}, info) {
  return allow(currentUser, VIEW_QLGD_REPORT)
}

const isAuthenticated = async function(parent, args, ctx, info) {
  return !ctx.currentUser.roles.includes('guest')
}

module.exports = {
  canSubscribeMe,
  canAssignRoles,
  canAssignPermissions,
  canRefreshCookies,
  canViewReport,
  isAuthenticated,
}
