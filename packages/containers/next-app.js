import React from 'react'
import ApolloProvider from 'containers/apollo-provider'
import { PageTransition } from 'next-page-transitions'
import { Provider as ReduxProvider } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import {UserAgentProvider} from '@quentin-sommer/react-useragent'
import {ThemeProvider} from 'styled-components';
import {withAlerts} from 'data/selectors'
import {Alerts} from 'mui-redux-alerts'

const UIContainer = withAlerts((props) => {
  const {Component, pageProps, router, pageContext, alerts} = props
  return (
    <JssProvider
      registry={pageContext.sheetsRegistry}
      generateClassName={pageContext.generateClassName}
    >
      <ThemeProvider theme={pageContext.theme}>
        <MuiThemeProvider
          theme={pageContext.theme}
          sheetsManager={pageContext.sheetsManager}
        >
          <CssBaseline />
          <Component key={router.route} {...pageProps} pageContext={pageContext} />  
          <Alerts alerts={alerts} />
        </MuiThemeProvider>
      </ThemeProvider>
    </JssProvider>
  )
})

const AppContainer = (props) => {
  const {apolloClient, reduxStore, ua} = props
  return (
    <ReduxProvider store={reduxStore}>
      <ApolloProvider client={apolloClient}>
        <UserAgentProvider ua={ua}> 
          <PageTransition timeout={300} classNames="page-transition">
            <UIContainer {...props} />
          </PageTransition>
        </UserAgentProvider>
      </ApolloProvider>
    </ReduxProvider>
  )   
}

export default AppContainer