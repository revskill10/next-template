export const VIEW_QLGD_REPORT = 'view:qlgd_report'

const allow = (currentUser, permission) => {
  return currentUser.permissions.includes(permission)
}

export default allow
