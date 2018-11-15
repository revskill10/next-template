import React, {useState, useEffect} from 'react'
import ApolloProvider from 'containers/apollo-provider'
import { Provider as ReduxProvider } from 'react-redux'
import {UserAgentProvider} from '@quentin-sommer/react-useragent'
import {UserContext} from 'containers/contexts'
import {
  CURRENT_USER_SUBSCRIPTION as subscription, 
  CURRENT_USER_QUERY as query,
} from 'containers/authentication.gql'
import UIContainer from 'containers/ui-container'
import registerServiceWs from 'lib/utils/register-service-worker'
import {openSnackbar} from 'mui-redux-alerts'
import CacheComponent from 'containers/cache-component'
import equal from 'fast-deep-equal'

const AppContainer = (props) => {
  const {apolloClient, reduxStore, ua, currentUser, token} = props

  useEffect(() => {
    registerServiceWs(reduxStore)
  })

  const cache = { currentUser }

  const onData = async (data) => {
    const me = data.subscriptionData.data.me
    const currentToken = localStorage.getItem('token')
    const shouldChange = currentToken && me && token && !equal(currentUser, me.currentUser)
    if (shouldChange === true) {
      localStorage.setItem('token', me.token)
      // reload cookies
      if (currentUser.active !== me.currentUser.active) {
        window.location.reload()
      }
      reduxStore.dispatch(openSnackbar({message: 'Your data has been changed', autoHideDuration: 3000}))
      setTimeout(async () => {await apolloClient.query({query}) }, 2000)
      
      //window.location.reload()
    }
  }
  
  return (    
      <ReduxProvider store={reduxStore}>
        <ApolloProvider client={apolloClient}>
          <UserAgentProvider ua={ua}> 
            <CacheComponent
              cache={cache}
              subscription={subscription}
              context={UserContext}
              onSubscriptionData={onData}
              toCache={(data) =>  { return {currentUser: data.me.currentUser} } }
            >
              <UIContainer {...props} />
            </CacheComponent>
          </UserAgentProvider>
        </ApolloProvider>
      </ReduxProvider>    
  )   
}

export default AppContainer