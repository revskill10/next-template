import CacheComponent from 'containers/cache-component'
import gql from 'graphql-tag'
import {inspect} from 'util'
import {withCurrentUser} from 'lib/with-current-user'
import {Mutation} from 'react-apollo'

const subscription = gql`
  subscription UserInfo {
    user_info{
      name
      roles
    }
  }
`

const REFRESH = gql`
  mutation {
    refresh {
      token
    }
  }
`

const onSubscriptionData = async ({newData, refresh}) => {
  if (newData) {
    const userInfo = newData.subscriptionData.data.user_info[0]
    console.log(`New Data ${inspect(userInfo)}`)
    const res = await refresh()
    localStorage.setItem("token", res.data.refresh.token)
    //window.location.reload()
  }
}

const Auth = ({currentUser, children}) =>
  <Mutation
    mutation={REFRESH}
  >{refresh => (
      <CacheComponent
        cache={ 
          {currentUser} 
        }
        subscription={subscription}
        onSubscriptionData={newData => onSubscriptionData({newData, refresh})}
      >
        {children}
      </CacheComponent>  
    )}
  </Mutation>

const AuthWithCurrentUser = ({currentUser, children}) => {
  if (currentUser.roles.includes('guest')) {
    return children({currentUser})
  } else {
    return <Auth currentUser={currentUser}>{children}</Auth>
  }
}
  
export default withCurrentUser(AuthWithCurrentUser)
