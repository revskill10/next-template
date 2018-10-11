import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export const withDocument = Container =>
  class extends Document {
    static async getInitialProps({renderPage}) {
      const sheet = new ServerStyleSheet()
      const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
      const styleTags = sheet.getStyleElement()
      return { ...page, styleTags }
    }
    render () {
      return <Container {...this.props} />
    }
  }

export default withDocument
