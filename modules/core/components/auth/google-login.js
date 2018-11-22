import { GoogleLogin } from 'react-google-login';
import { Mutation } from "react-apollo";
import Button from '@material-ui/core/Button';
import Menu from 'components/auth/menu'
import {LOGIN, LOGOUT} from 'components/auth/google-login.gql'
import useAuth from 'lib/hooks/auth'
import useGoogleAuth from 'lib/hooks/google-auth'

const Login = () => {
  const {
    onSuccess,
    onFailure
  } = useGoogleAuth('token')

  return (
    <Mutation 
      mutation={LOGIN}    
    >  
      {loginMutation => (
        <GoogleLogin
          clientId="348227035708-ter7nr3ckok77jn08h1sjtircno59jkj.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={onSuccess(loginMutation)}
          onFailure={onFailure}
        />
      )}
    </Mutation>
  )
}

const Logout = () => {
  const {
    logout
  } = useGoogleAuth('token')

  return (
    <Mutation
      mutation={LOGOUT}
    >
      {logoutMutation => (
        <Button variant="contained" color="primary"
          onClick={() => logout(logoutMutation)}
        >
          Logout
        </Button>
      )}
    </Mutation>
  )
}

const GoogleAuth = () => {
  const {isAuthenticated} = useAuth()
  if (!isAuthenticated) {
    return <Login />
  } else {
    return (
      <Menu>
        <Logout />
      </Menu>
    )
  }
}

export default GoogleAuth
