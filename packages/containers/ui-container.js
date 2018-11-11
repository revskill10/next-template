import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import {ThemeProvider} from 'styled-components';
import {withAlerts} from 'data/selectors'
import {Alerts} from 'mui-redux-alerts'
import { PageTransition } from 'next-page-transitions'

const UIContainer = withAlerts((props) => {
  const {Component, pageProps, router, pageContext, alerts} = props
  return (
    <PageTransition timeout={300} classNames="page-transition">
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
            <Alerts alerts={alerts} />
          </MuiThemeProvider>
        </ThemeProvider>
      </JssProvider>
    </PageTransition>
  )
})

export default UIContainer