import App, { Container } from 'next/app'
import getPageContext from 'lib/get-page-context';
import { I18nextProvider} from 'react-i18next';
import initialI18nInstance from 'lib/i18n';


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
      const { pageProps } = this.props;
      const { i18n, initialI18nStore, initialLanguage } = pageProps || {}

      return (
        <Container>
          <I18nextProvider
            i18n={i18n || initialI18nInstance}
            initialI18nStore={initialI18nStore}
            initialLanguage={initialLanguage}
          >
            <AppContainer {...this.props} {...pageProps} pageContext={this.pageContext} />
          </I18nextProvider>
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