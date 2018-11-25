
function checkPermissions(userPermissions, allowedPermissions) {
  if (allowedPermissions.length === 0) {
    return true;
  }

  return userPermissions.some(function(permission){
    return allowedPermissions.includes(permission)
  });
};

function isAllowed({currentUser, allowedPermissions = [], accessCheck, extraAccessData}) {
  const { permissions } = currentUser
  let permitted;
  // when an accessCheck function is provided, ensure that passes as well as the permissions
  if (accessCheck) {
    permitted =
        accessCheck(currentUser, extraAccessData) &&
    checkPermissions(permissions, allowedPermissions);
  } else {
      // otherwise only check permissions
      permitted = checkPermissions(permissions, allowedPermissions);
  }
  return permitted
}

module.exports = isAllowed
