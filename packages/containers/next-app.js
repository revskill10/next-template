import React, {useState, useEffect} from 'react'
import ApolloProvider from 'containers/apollo-provider'
import { Provider as ReduxProvider } from 'react-redux'
import {UserAgentProvider} from '@quentin-sommer/react-useragent'
import {UserContext} from 'containers/contexts'
import {CURRENT_USER_SUBSCRIPTION as query} from 'containers/authentication.gql'
import UIContainer from 'containers/ui-container'
import registerServiceWs from 'lib/utils/register-service-worker'
import equal from 'fast-deep-equal'
import {openSnackbar} from 'mui-redux-alerts'

const useCurrentUser = ({currentUser, apolloClient, reduxStore}) => {
  const [user, setUser] = useState(currentUser)
  
  useEffect(() => {
    registerServiceWs(reduxStore)
    const querySubscription = apolloClient.subscribe({
      query,
      variables: {}
    }).subscribe({
      next ({data}) {
        if (data && data.me) {
          if (!equal(user, data.me.currentUser)) {
            setUser(data.me.currentUser)
            reduxStore.dispatch(openSnackbar({message: 'Your data has been changed', autoHideDuration: 4000}))
          }
        }
      }
    });
    return function cleanup() {
      querySubscription.unsubscribe()
    }
  }, [user])
  return user
}

const AppContainer = (props) => {
  const {apolloClient, reduxStore, ua} = props
  const user = useCurrentUser(props)
  
  return (
    <UserContext.Provider value={ {currentUser: user} }>
      <ReduxProvider store={reduxStore}>
        <ApolloProvider client={apolloClient}>
          <UserAgentProvider ua={ua}> 
            <UIContainer {...props} />
          </UserAgentProvider>
        </ApolloProvider>
      </ReduxProvider>
    </UserContext.Provider>
  )   
}

export default AppContainer