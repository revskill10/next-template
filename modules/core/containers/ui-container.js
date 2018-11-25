import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import {ThemeProvider} from 'styled-components';
import { PageTransition } from 'next-page-transitions'
import Loader from 'components/loader'
import styles, {TIMEOUT} from 'containers/ui-container.styles'

const UIContainer = (props) => {
  const {Component, pageProps, router, pageContext, lng} = props
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
            <>
              <CssBaseline />
              <Component key={router.route} {...pageProps} pageContext={pageContext} lng={lng} />              
            </>
          </MuiThemeProvider>
        </ThemeProvider>
      </JssProvider>
    </PageTransition>
    <style jsx global>{styles}</style>
    </>
  )
}

export default UIContainer