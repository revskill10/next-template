import useSubscriptionAuth from 'lib/hooks/subscription-auth'
import CacheComponent from 'containers/cache-component'
import {withCurrentUser} from 'lib/hocs/with-current-user'
import {Mutation} from 'react-apollo'
import {withAlerts} from 'data/selectors'

const Auth = ({children, openAlert}) => {
  const { 
    currentUser, 
    onSubscriptionData,
    refreshTokenMutation,
    currentUserSubscription,
  } = useSubscriptionAuth()

  return (
    <Mutation
      mutation={refreshTokenMutation}
    >{refresh => (
        <CacheComponent
          cache={{currentUser}}
          subscription={currentUserSubscription}
          onSubscriptionData={onSubscriptionData(refresh, openAlert)}
        >{() => <>{children}</>}
        </CacheComponent>  
      )}
    </Mutation>
  )
}

export default withCurrentUser(withAlerts(Auth))
