import App, { Container } from 'next/app'
import getPageContext from 'lib/utils/get-page-context';
import styles from 'lib/hocs/with-app.styles'
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
    /*
    componentDidMount(){
      
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }
    */
    render () {          
      return (
        <Container>
          <AppContainer {...this.props} pageContext={this.pageContext} />
          <style jsx>{styles}</style>
        </Container>
      )
    }
  }

export default withApp