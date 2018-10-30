import useAuth from 'lib/hooks/auth'
import {CURRENT_USER_QUERY} from 'lib/with-current-user.gql'
import {LOGOUT} from 'components/auth/google-login.gql'
import {CURRENT_USER_SUBSCRIPTION, REFRESH_TOKEN_MUTATION} from 'containers/authentication.gql'

const useSubscriptionAuth = () => {
  const { currentUser, isAuthenticated } = useAuth()

  const onSubscriptionData = (client, refresh) => async (newData) => {
    if (newData) {
      const newUser = newData.subscriptionData.data.currentUser
      if (isAuthenticated && newUser.roles.includes('guest')){
        await client.mutate({
          mutation: LOGOUT
        })
        localStorage.removeItem("token")
        window.location.reload()
      } 
      const res = await refresh()
      localStorage.setItem("token", res.data.refresh.token)
      client.writeQuery({
        query: CURRENT_USER_QUERY,
        data: {
          currentUser: newUser,
        }
      })
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