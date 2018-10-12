import { Head, Main, NextScript } from 'next/document'

const DocumentContainer = ({styleTags, pageContext}) =>
  <html lang="en" dir="ltr">
    <Head>
      <meta charSet="utf-8" />
      {/* Use minimum-scale=1 to enable GPU rasterization */}
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
      />
      {/* PWA primary color */}
      <meta name="theme-color" content={pageContext.theme.palette.primary.main} />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
      />
      {styleTags}
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </html>

export default DocumentContainer