import App, { Container } from 'next/app'
import getPageContext from 'lib/utils/get-page-context';

const withApp = AppContainer =>
  class extends App {
    static async getInitialProps (props) {
      const { Component, router, ctx, } = props
      const {query} = router
      const {phone} = query

      let pageProps = {}
     
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
      }
    
      return { pageProps, router, phone }
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
        </Container>
      )
    }
  }
  


export default withApp