import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import {ThemeProvider} from 'styled-components';
import { PageTransition } from 'next-page-transitions'
import Loader from 'components/loader'
import 'containers/style.css'
const TIMEOUT=400
const UIContainer = (props) => {
  const {Component, pageProps, router, pageContext} = props
  return (
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
            <>
              <CssBaseline />
              <Component key={router.route} {...pageProps} pageContext={pageContext} />              
            </>
          </MuiThemeProvider>
        </ThemeProvider>
      </JssProvider>
    </PageTransition>
  )
}

export default UIContainer