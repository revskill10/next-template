import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { PageTransition } from 'next-page-transitions'
import { Provider as ReduxProvider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import initialI18nInstance from 'lib/i18n'
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';

const AppContainer = ({Component, pageProps, apolloClient, router, reduxStore, pageContext}) => {
  const { i18n, initialI18nStore, initialLanguage } = pageProps || {}
  return (
    <ReduxProvider store={reduxStore}>
      <ApolloProvider client={apolloClient}>
        <PageTransition timeout={300} classNames="page-transition">
          <I18nextProvider
          i18n={i18n || initialI18nInstance}
          initialI18nStore={initialI18nStore}
          initialLanguage={initialLanguage}
        >
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
            <CssBaseline />
            <Component key={router.route} {...pageProps} pageContext={pageContext} />
          </MuiThemeProvider>
          </JssProvider>
          </I18nextProvider>
        </PageTransition>
      </ApolloProvider>
    </ReduxProvider>
  )   
}

export default AppContainer