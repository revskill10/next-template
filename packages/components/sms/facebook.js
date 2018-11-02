import AccountKit from 'react-facebook-account-kit';

import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig()
const {FB_APP_ID} = publicRuntimeConfig
import guid from 'guid'

const Sms = () => {
  return (
    <AccountKit
      appId={`${FB_APP_ID}`} // Update this!
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
