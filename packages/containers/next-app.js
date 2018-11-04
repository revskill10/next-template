import React from 'react'
import ApolloProvider from 'containers/apollo-provider'
import { PageTransition } from 'next-page-transitions'
import { Provider as ReduxProvider } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import {UserAgentProvider} from '@quentin-sommer/react-useragent'
import {ThemeProvider} from 'styled-components';

const AppContainer = ({Component, pageProps, apolloClient, router, reduxStore, pageContext, ua}) => {
  return (
    <ReduxProvider store={reduxStore}>
      <ApolloProvider client={apolloClient}>
        <UserAgentProvider ua={ua}> 
          <PageTransition timeout={300} classNames="page-transition">
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
                </MuiThemeProvider>
              </ThemeProvider>
            </JssProvider>
          </PageTransition>
        </UserAgentProvider>
      </ApolloProvider>
    </ReduxProvider>
  )   
}

export default AppContainer