import React, {useState, useEffect} from 'react'
import ApolloProvider from 'containers/apollo-provider'
import { Provider as ReduxProvider } from 'react-redux'
import {UserAgentProvider} from '@quentin-sommer/react-useragent'
import {UserContext} from 'containers/contexts'
import {
  CURRENT_USER_SUBSCRIPTION as subscription, 
  REFRESH_COOKIES_MUTATION as mutation,
  CURRENT_USER_QUERY as query,
} from 'containers/authentication.gql'
import UIContainer from 'containers/ui-container'
import registerServiceWs from 'lib/utils/register-service-worker'
import {openSnackbar} from 'mui-redux-alerts'
import CacheComponent from 'containers/cache-component'
import equal from 'fast-deep-equal'

const AppContainer = (props) => {
  const {apolloClient, reduxStore, ua} = props

  useEffect(() => {
    registerServiceWs(reduxStore)
  })

  const {me} = apolloClient.readQuery({query})

  const onData = async (data) => {
    const meUpdated = data.subscriptionData.data.me
    if (!equal(me.currentUser, meUpdated.currentUser)) {
      const variables = {token: meUpdated.token}
      await apolloClient.mutate({mutation, variables})
      reduxStore.dispatch(openSnackbar({message: 'Your data has been changed', autoHideDuration: 3000}))
      setTimeout(async () => {
        window.location.reload()  
      }, 2000)
    }
  }
  
  return (    
    <ReduxProvider store={reduxStore}>
      <ApolloProvider client={apolloClient}>
        <UserAgentProvider ua={ua}> 
          <CacheComponent
            cache={ me }
            subscription={subscription}
            context={UserContext}
            onSubscriptionData={onData}
            toCache={(data) =>  { return data.me }}
          >
            <UIContainer {...props} />
          </CacheComponent>
        </UserAgentProvider>
      </ApolloProvider>
    </ReduxProvider>    
  )   
}

export default AppContainer