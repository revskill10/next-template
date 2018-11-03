import useAuth from 'lib/hooks/auth'
import {useApolloMutation} from 'lib/hooks/apollo'
import {CURRENT_USER_QUERY} from 'lib/hocs/with-current-user.gql'
import {LOGOUT} from 'components/auth/google-login.gql'
import {CURRENT_USER_SUBSCRIPTION, REFRESH_TOKEN_MUTATION} from 'containers/authentication.gql'
import isEqual from 'react-fast-compare'

function sorted(user) {
  return {
    user_id: user.user_id,
    roles: user.roles.sort(),
    permissions: user.permissions.sort(),
  }
}

const useSubscriptionAuth = () => {
  const { currentUser, isAuthenticated } = useAuth()
  const logout = useApolloMutation(LOGOUT)
  
  const onSubscriptionData = (client, refresh) => async (newData) => {
    if (newData) {
      const newUser = newData.subscriptionData.data.currentUser
      const isGuest = newUser.roles.includes('guest')
      if (isAuthenticated && isGuest){
        await logout()
        localStorage.removeItem("token")
        window.location.reload()
      } 
      if (!isGuest) {
        const res = await refresh()
        localStorage.setItem('token',res.data.refresh.token)
        client.writeQuery({
          query: CURRENT_USER_QUERY,
          data: {
            currentUser: newUser,
          }
        })
        if (!isEqual(sorted(currentUser), sorted(newUser) )) {
          window.location.reload()
        }
      }
    }
  }

  return {
    currentUser,
    onSubscriptionData,
    currentUserSubscription: CURRENT_USER_SUBSCRIPTION,
    refreshTokenMutation: REFRESH_TOKEN_MUTATION,
  }
}

export default useSubscriptionAuth