import React, {useState, useEffect} from 'react'

import { Provider as ReduxProvider } from 'react-redux'
import {UserAgentProvider} from '@quentin-sommer/react-useragent'
import {UserContext} from 'containers/contexts'
import {
  CURRENT_USER_SUBSCRIPTION as subscription, 
  REFRESH_COOKIES_MUTATION as mutation,
  CURRENT_USER_QUERY as query,
} from 'containers/authentication.gql'

import registerServiceWs from 'lib/utils/register-service-worker'
import {openSnackbar} from 'mui-redux-alerts'
import i18n from 'lib/i18n';
import equal from 'fast-deep-equal'
import dynamic from 'next/dynamic'
//import CacheComponent from 'containers/cache-component'
const CacheComponent = dynamic(import('containers/cache-component'))
//import UIContainer from 'containers/ui-container'
const UIContainer = dynamic(import('containers/ui-container'))
const UIContainerMobile = dynamic(import('containers/ui-container.mobile'))
//import ApolloProvider from 'containers/apollo-provider'
const ApolloProvider = dynamic(import('containers/apollo-provider'))

const AppContainer = (props) => {
  const {apolloClient, reduxStore, ua, phone} = props

  const Container = phone ? UIContainerMobile : UIContainer

  useEffect(() => {
    registerServiceWs(reduxStore)
  })

  const {me} = apolloClient.readQuery({query})

  const onData = async (data) => {
    const meUpdated = data.subscriptionData.data.me
    if (!equal(me.currentUser, meUpdated.currentUser) && equal(me.currentUser.active, meUpdated.currentUser.active)) {
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
              <Container {...props} />
            </CacheComponent>
          </UserAgentProvider>
        </ApolloProvider>
      </ReduxProvider>   
  )   
}

export default AppContainer