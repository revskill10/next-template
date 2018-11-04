import { GoogleLogin } from 'react-google-login';
import { Mutation } from "react-apollo";
import Button from '@material-ui/core/Button';
import {LOGIN, LOGOUT} from 'components/auth/google-login.gql'
import useAuth from 'lib/hooks/auth'
import Menu from 'components/auth/menu'

const responseGoogle = async (response, loginMutation) => {
  const { data } = await loginMutation({variables: {id_token: response.tokenId}})
  if (data.login) {
    localStorage.setItem("token", data.login.token)
    window.location.reload()    
  }
}

const logout = async (logoutMutation) => {  
  const { data } = await logoutMutation()
  if (data.logout) {
    localStorage.removeItem("token")
    window.location.reload()
  }
}

const Login = () =>
  <Mutation 
    mutation={LOGIN}    
  >  
    {loginMutation => (
      <GoogleLogin
        clientId="348227035708-ter7nr3ckok77jn08h1sjtircno59jkj.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={response => responseGoogle(response, loginMutation)}
        onFailure={response => responseGoogle(response)}
      />
    )}
  </Mutation>

const Logout = () =>
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
