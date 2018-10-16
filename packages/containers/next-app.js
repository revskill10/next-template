import React, {Fragment} from 'react'
import { ApolloProvider } from 'react-apollo'
import { PageTransition } from 'next-page-transitions'
import { Provider as ReduxProvider } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import NProgressStyles from "next-nprogress/styles";

const AppContainer = ({Component, pageProps, apolloClient, router, reduxStore, pageContext}) => {
  return (
    <ReduxProvider store={reduxStore}>
      <ApolloProvider client={apolloClient}>
        <PageTransition timeout={300} classNames="page-transition">
          <JssProvider
          registry={pageContext.sheetsRegistry}
          generateClassName={pageContext.generateClassName}
        >
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <MuiThemeProvider
            theme={pageContext.theme}
            sheetsManager={pageContext.sheetsManager}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <Fragment>
              <NProgressStyles color="#ddd" spinner={true} />
              <CssBaseline />
              <Component key={router.route} {...pageProps} pageContext={pageContext} />
            </Fragment>
          </MuiThemeProvider>
          </JssProvider>
        </PageTransition>
      </ApolloProvider>
    </ReduxProvider>
  )   
}

export default AppContainer