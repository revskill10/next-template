import App from 'next/app'

const withApp = Container =>
  class extends App {
    static async getInitialProps ({ Component, router, ctx }) {
      let pageProps = {}
     
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
      }
    
      return { pageProps, router }
    }
    render () {
      return <Container {...this.props} />
    }
  }

export default withApp