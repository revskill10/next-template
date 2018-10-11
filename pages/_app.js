import App, {Container} from 'next/app'
import React from 'react'
import withApolloClient from '../lib/with-apollo-client'
import { ApolloProvider } from 'react-apollo'
import { PageTransition } from 'next-page-transitions'
import withReduxStore from '../lib/with-redux-store'
import { Provider as ReduxProvider } from 'react-redux'

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}
 
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
 
    return { pageProps, router }
  }

  render () {
    const {Component, pageProps, apolloClient, router, reduxStore} = this.props
    return <Container>
      <ReduxProvider store={reduxStore}>
        <ApolloProvider client={apolloClient}>
          <PageTransition timeout={300} classNames="page-transition">
            <Component key={router.route} {...pageProps} />
          </PageTransition>
        </ApolloProvider>
      </ReduxProvider>
      <style jsx global>{`
        .page-transition-enter {
          opacity: 0;
        }
        .page-transition-enter-active {
          opacity: 1;
          transition: opacity 300ms;
        }
        .page-transition-exit {
          opacity: 1;
        }
        .page-transition-exit-active {
          opacity: 0;
          transition: opacity 300ms;
        }
      `}</style>
    </Container>
  }
}

export default withApolloClient(withReduxStore(MyApp))
