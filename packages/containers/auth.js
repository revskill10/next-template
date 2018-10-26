import CacheComponent from 'containers/cache-component'
import {withCurrentUser} from 'lib/with-current-user'
import {Mutation} from 'react-apollo'
import {CURRENT_USER_SUBSCRIPTION, REFRESH_TOKEN_MUTATION} from 'containers/auth.gql'
import {CURRENT_USER_QUERY} from 'lib/with-current-user.gql'

const onSubscriptionData = async ({newData, refresh, client}) => {
  if (newData) {
    const currentUser = newData.subscriptionData.data.currentUser
    const res = await refresh()
    localStorage.setItem("token", res.data.refresh.token)
    client.writeQuery({
      query: CURRENT_USER_QUERY,
      data: {
        currentUser,
      }
    })
    //window.location.reload()
  }
}

const Auth = ({currentUser, children}) =>
  <Mutation
    mutation={REFRESH_TOKEN_MUTATION}
  >{(refresh, {client}) => (
      <CacheComponent
        cache={ 
          {currentUser} 
        }
        subscription={CURRENT_USER_SUBSCRIPTION}
        onSubscriptionData={newData => onSubscriptionData({newData, refresh, client})}
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
