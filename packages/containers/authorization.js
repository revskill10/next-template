import {useState} from 'react'
import useAuth from 'lib/hooks/auth'
import AccountKit from 'components/sms/account-kit';
import guid from 'guid'
import {Button} from 'components/forms/styled'

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

const Authorization = ({secure = false, children, title="Please verify your account", ...rest}) => {
  const [isVerified, setVerified] = useState(false)

  if (secure) {
    if (isVerified) {
      return (
        <AccessControl {...rest}>
          {children}
        </AccessControl>
      )
    } else {
      return (
        <AccessControl {...rest}>    
          <AccountKit
            appId="2338666273028813" // Update this!
            version="v1.0" // Version must be in form v{major}.{minor}
            onResponse={(response) => {
              //console.log(resp)
              if (response.status === "PARTIALLY_AUTHENTICATED") {
                setVerified(true)
              } else {
                setVerified(false)
              }
            } }
            csrf={guid.raw()} // Required for security
            countryCode={'+84'} // eg. +60
            phoneNumber={'794115322'} // eg. 12345678
            emailAddress={'checkraiser11@gmail.com'} // eg. me@site.com
          >
            {p => <Button {...p}>{title}</Button>}
          </AccountKit>
        </AccessControl>
      )
    }
    
  } else {
    return (
      <AccessControl {...rest}>
        {children}
      </AccessControl>
    )
  }  
}

export default Authorization;