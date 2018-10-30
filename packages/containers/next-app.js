import React from 'react'
import ApolloProvider from 'containers/apollo-provider'
import { PageTransition } from 'next-page-transitions'
import { Provider as ReduxProvider } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import NProgress from "components/nprogress";
import {UserAgentProvider} from '@quentin-sommer/react-useragent'

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
              <MuiThemeProvider
                theme={pageContext.theme}
                sheetsManager={pageContext.sheetsManager}
              >
                <NProgress color="#fff" spinner />
                <CssBaseline />
                <Component key={router.route} {...pageProps} pageContext={pageContext} />
              </MuiThemeProvider>
            </JssProvider>
          </PageTransition>
        </UserAgentProvider>
      </ApolloProvider>
    </ReduxProvider>
  )   
}

export default AppContainer