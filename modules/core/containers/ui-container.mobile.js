import {ThemeProvider} from 'styled-components';

const UIContainer = (props) => {
  const {Component, pageProps, router, pageContext} = props
  return (
    <ThemeProvider theme={pageContext.theme}>
      <Component key={router.route} {...pageProps} pageContext={pageContext} />              
    </ThemeProvider>
  )
}

export default UIContainer
