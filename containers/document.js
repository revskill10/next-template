import { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

const DocumentContainer = ({styleTags}) =>
  <html>
    <Head>
      {styleTags}
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </html>

DocumentContainer.getInitialProps = ({renderPage}) => {
  const sheet = new ServerStyleSheet()
  const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
  const styleTags = sheet.getStyleElement()
  return { ...page, styleTags }
}

export default DocumentContainer