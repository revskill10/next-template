import React, {Fragment} from 'react'
import { ApolloProvider } from 'react-apollo'
import { PageTransition } from 'next-page-transitions'
import { Provider as ReduxProvider } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import NProgressStyles from "next-nprogress/styles";
import { I18nextProvider} from 'react-i18next';
import initialI18nInstance from 'lib/i18n';
import {UserAgentProvider} from '@quentin-sommer/react-useragent'

const AppContainer = ({Component, pageProps, apolloClient, router, reduxStore, pageContext, ua}) => {
  const { i18n, initialI18nStore, initialLanguage } = pageProps || {}
  return (
    <I18nextProvider
      i18n={i18n || initialI18nInstance}
      initialI18nStore={initialI18nStore}
      initialLanguage={initialLanguage}
    >
      <ReduxProvider store={reduxStore}>
        <ApolloProvider client={apolloClient}>
          <PageTransition timeout={300} classNames="page-transition">
            <JssProvider
            registry={pageContext.sheetsRegistry}
            generateClassName={pageContext.generateClassName}
          >
            <MuiThemeProvider
              theme={pageContext.theme}
              sheetsManager={pageContext.sheetsManager}
            >
              <NProgressStyles color="#fff" spinner={true} />
              <CssBaseline />
              <UserAgentProvider ua={ua}>
                <Component key={router.route} {...pageProps} pageContext={pageContext} />
              </UserAgentProvider>
            </MuiThemeProvider>
            </JssProvider>
          </PageTransition>
        </ApolloProvider>
      </ReduxProvider>
    </I18nextProvider>
  )   
}

export default AppContainer