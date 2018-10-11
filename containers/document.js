import { Head, Main, NextScript } from 'next/document'

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

export default DocumentContainer