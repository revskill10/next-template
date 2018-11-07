import useAuth from 'lib/hooks/auth'
import {useContext} from 'react'
import {useApolloMutation} from 'lib/hooks/apollo'
import {LOGOUT} from 'components/auth/google-login.gql'
import {CURRENT_USER_SUBSCRIPTION, REFRESH_TOKEN_MUTATION} from 'containers/authentication.gql'
import {CURRENT_USER_QUERY as query} from 'lib/hocs/with-current-user.gql'
import {ApolloContext} from 'containers/contexts'

const useSubscriptionAuth = () => {
  const { currentUser, isAuthenticated } = useAuth()
  const logout = useApolloMutation(LOGOUT)
  const client = useContext(ApolloContext)
  
  const onSubscriptionData = (refresh) => async (newData) => {
    if (newData && newData.subscriptionData.data.me) {
      const me = newData.subscriptionData.data.me
      const isUser = me.currentUser.roles.includes('user')
      const currentToken = localStorage.getItem('token')

      if (isAuthenticated && isUser) {
        if (me.token !== currentToken) {
          const res = await refresh()
          window.localStorage.setItem('token', res.data.refresh.token)
          client.writeQuery({
            query,
            data: {
              currentUser: me.currentUser
            }
          })
        }
      }
      if (isAuthenticated && !isUser) {
        await logout()
        window.location.reload()
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