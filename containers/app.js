import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { PageTransition } from 'next-page-transitions'
import { Provider as ReduxProvider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import initialI18nInstance from 'lib/i18n'

const AppContainer = ({Component, pageProps, apolloClient, router, reduxStore}) => {
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
            <Component key={router.route} {...pageProps} />
          </I18nextProvider>
        </PageTransition>
      </ApolloProvider>
    </ReduxProvider>
  )   
}

export default AppContainer