import { GoogleLogin } from 'react-google-login';
import gql from 'graphql-tag'
import { Mutation } from "react-apollo";
import { withCurrentUser } from 'lib/with-current-user'
import Button from '@material-ui/core/Button';

const LOGIN = gql`
  mutation Login($id_token: String!) {
    login(id_token: $id_token) {
      token
    }
  }
`;

const LOGOUT = gql`
  mutation Logout {
    logout
  }
`

const responseGoogle = async (response, loginMutation) => {
  const { data } = await loginMutation({variables: {id_token: response.tokenId}})
  if (data.login) {
    localStorage.setItem("Authorization", `Bearer ${data.login.token}`)
    window.location.reload()
  }
}

const logout = async (logoutMutation) => {
  console.log('logout')
  const { data } = await logoutMutation()
  if (data.logout) {
    localStorage.removeItem("Authorization")
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

const GoogleAuth = ({ currentUser }) => {
  const roles = currentUser.roles
  if (roles.includes('anonymous')) {
    return <Login />
  } else {
    return <Logout />
  }
}

export default withCurrentUser(GoogleAuth)
