import AccountKit from 'components/sms/account-kit';
import guid from 'guid'

const Sms = () => {
  return (
      <AccountKit
        appId="2338666273028813" // Update this!
        version="v1.0" // Version must be in form v{major}.{minor}
        onResponse={(resp) => console.log(resp)}
        csrf={guid.raw()} // Required for security
        countryCode={'+84'} // eg. +60
        phoneNumber={'794115322'} // eg. 12345678
        emailAddress={'checkraiser11@gmail.com'} // eg. me@site.com
      >
        {p => <button {...p}>Initialize Account Kit</button>}
      </AccountKit>
  )
}

export default Sms
