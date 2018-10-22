import { GoogleLogin } from 'react-google-login';
import gql from 'graphql-tag'
import { Mutation } from "react-apollo";

const LOGIN = gql`
  mutation Login($id_token: String!) {
    login(id_token: $id_token) {
      token
    }
  }
`;


const responseGoogle = async (response, loginMutation) => {
  console.log(response.tokenId)
  const { data } = await loginMutation({variables: {id_token: response.tokenId}})
  if (data.login) {
    // client.query(CURRENT_USER)
    // set Redux
    localStorage.setItem("Authorization", `Bearer ${data.login.token}`)
    window.location.reload()
  }
}

const Google = () =>
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

export default Google