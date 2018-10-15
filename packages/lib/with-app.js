import App, { Container } from 'next/app'
import registerSw from 'lib/register-sw'
import getPageContext from 'lib/get-page-context';

const withApp = AppContainer =>
  class extends App {
    static async getInitialProps ({ Component, router, ctx }) {
      let pageProps = {}
     
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
      }
    
      return { pageProps, router }
    }
    constructor(props) {
      super(props);
      this.pageContext = getPageContext();
    }
    componentDidMount(){
      if (process.env.NODE_ENV === 'production') {
        registerSw()
      }
      /*
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
      */
    }
    render () {
      return (
        <Container>
          <AppContainer {...this.props} pageContext={this.pageContext} />
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