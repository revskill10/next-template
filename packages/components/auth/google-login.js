import { GoogleLogin } from 'react-google-login';


const responseGoogle = (response) => {
  console.log(response);
}

const Google = () =>
  <GoogleLogin
    clientId="348227035708-ter7nr3ckok77jn08h1sjtircno59jkj.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
  />

export default Google