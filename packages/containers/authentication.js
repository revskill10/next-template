import useSubscriptionAuth from 'lib/hooks/subscription-auth'
import CacheComponent from 'containers/cache-component'
import {withCurrentUser} from 'lib/hocs/with-current-user'
import {Mutation} from 'react-apollo'

const Auth = ({children}) => {
  const { 
    currentUser, 
    onSubscriptionData,
    refreshTokenMutation,
    currentUserSubscription,
  } = useSubscriptionAuth()

  return (
    <Mutation
      mutation={refreshTokenMutation}
    >{(refresh, {client}) => (
        <CacheComponent
          cache={{currentUser}}
          subscription={currentUserSubscription}
          onSubscriptionData={onSubscriptionData(client, refresh)}
        >{() => <>{children}</>}
        </CacheComponent>  
      )}
    </Mutation>
  )
}

export default withCurrentUser(Auth)
