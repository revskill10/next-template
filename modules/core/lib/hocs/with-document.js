import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import flush from 'styled-jsx/server';
import PropTypes from 'prop-types';
import csso from 'csso'
import {inspect} from 'util'

export const withDocument = Container =>
  class extends Document {
    static async getInitialProps(ctx) {
      
      
      // Resolution order
      //
      // On the server:
      // 1. app.getInitialProps
      // 2. page.getInitialProps
      // 3. document.getInitialProps
      // 4. app.render
      // 5. page.render
      // 6. document.render
      //
      // On the server with error:
      // 1. document.getInitialProps
      // 2. app.render
      // 3. page.render
      // 4. document.render
      //
      // On the client
      // 1. app.getInitialProps
      // 2. page.getInitialProps
      // 3. app.render
      // 4. page.render
      const {renderPage, query} = ctx
      const {phone} = query
      const sheet = new ServerStyleSheet()

      let pageContext;
      let page;
      if (!phone) {
        page = renderPage((App) => (props) => {
          pageContext = props.pageContext
          return sheet.collectStyles(<App {...props} />)
        }
      );
      } else {
        page = renderPage((App) => (props) =>
          sheet.collectStyles(<App {...props} />),
        );
      }
      
      const styleTags = sheet.getStyleElement()
      if (!phone) {
        const css = pageContext.sheetsRegistry.toString()
        const ast = csso.syntax.parse(css);
        const compressedAst = csso.compress(ast).ast;
        const minifiedCss = csso.syntax.generate(compressedAst);
        return { 
          ...page, 
          phone,
          pageContext,
          styleTags,
          styles: (
            <React.Fragment>
              <style
                id="jss-server-side"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: minifiedCss }}
              />
              {flush() || null}
            </React.Fragment>
          ),
        }
      } else {
        return {
          ...page,
          phone,
          styleTags,
          pageContext,
        }
      }
    }
    render () {
      return <Container {...this.props} />
    }
  }

export default withDocument