import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import {ThemeProvider} from 'styled-components';
import { PageTransition } from 'next-page-transitions'
import Loader from 'components/loader'

const TIMEOUT = 400

const UIContainer = (props) => {
  const {Component, pageProps, router, pageContext} = props
  return (
    <>
    <PageTransition
      timeout={TIMEOUT}
      classNames='page-transition'
      loadingComponent={<Loader />}
      loadingDelay={500}
      loadingTimeout={{
        enter: TIMEOUT,
        exit: 0
      }}
      loadingClassNames='loading-indicator'
      >
      <JssProvider
        registry={pageContext.sheetsRegistry}
        generateClassName={pageContext.generateClassName}
      >
        <ThemeProvider theme={pageContext.theme}>
          <MuiThemeProvider
            theme={pageContext.theme}
            sheetsManager={pageContext.sheetsManager}
          >
            <CssBaseline />
              <Component key={router.route} {...pageProps} pageContext={pageContext} />              
          </MuiThemeProvider>
        </ThemeProvider>
      </JssProvider>
    </PageTransition>
    <style jsx global>{`
      .page-transition-enter {
        opacity: 0;
        transform: translate3d(0, 20px, 0);
      }
      .page-transition-enter-active {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        transition: opacity ${TIMEOUT}ms, transform ${TIMEOUT}ms;
      }
      .page-transition-exit {
        opacity: 1;
      }
      .page-transition-exit-active {
        opacity: 0;
        transition: opacity ${TIMEOUT}ms;
      }
      .loading-indicator-appear,
      .loading-indicator-enter {
        opacity: 0;
      }
      .loading-indicator-appear-active,
      .loading-indicator-enter-active {
        opacity: 1;
        transition: opacity ${TIMEOUT}ms;
      }
    `}</style>
    </>
  )
}

export default UIContainer