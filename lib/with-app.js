import App, { Container } from 'next/app'

const withApp = AppContainer =>
  class extends App {
    static async getInitialProps ({ Component, router, ctx }) {
      let pageProps = {}
     
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
      }
    
      return { pageProps, router }
    }
    render () {
      return (
        <Container>
          <AppContainer {...this.props} />
          <style jsx>{`
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
      )
    }
  }

export default withApp