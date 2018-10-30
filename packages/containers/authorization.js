import useAuth from 'lib/hooks/auth'
import { UserContext } from 'containers/contexts'

const checkPermissions = (userPermissions, allowedPermissions) => {
    if (allowedPermissions.length === 0) {
        return true;
    }

    return userPermissions.some(permission =>
        allowedPermissions.includes(permission)
    );
};

const AccessControl = ({    
    allowedPermissions,
    children,
    renderNoAccess,
    accessCheck,
    extraAccessData,
}) => {
    const { currentUser } = useAuth()
    const { permissions } = currentUser
    
    let permitted;
    // when an accessCheck function is provided, ensure that passes as well as the permissions
    if (accessCheck) {
        permitted =
            accessCheck(extraAccessData, currentUser) &&
        checkPermissions(permissions, allowedPermissions);
    } else {
        // otherwise only check permissions
        permitted = checkPermissions(permissions, allowedPermissions);
    }

    if (permitted) {
      if (typeof(children) === 'function') {
        return children({currentUser})
      } else {
        return children
      }
    }
    return renderNoAccess();
};

AccessControl.defaultProps = {
    allowedPermissions: [],
    renderNoAccess: () => null,
};

export default AccessControl;