function allow(currentUser, permission) {
  return currentUser.permissions.includes(permission)
}
const VIEW_QLGD_REPORT = 'view:qlgd_report'

module.exports = {
  allow,
  VIEW_QLGD_REPORT,
}
