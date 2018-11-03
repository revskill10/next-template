import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import flush from 'styled-jsx/server';
import PropTypes from 'prop-types';

export const withDocument = Container =>
  class extends Document {
    static async getInitialProps({renderPage}) {
      
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

      let pageContext;
      const sheet = new ServerStyleSheet()
      const page = renderPage(App => {
        const WrappedApp = props => {
          pageContext = props.pageContext;
          return sheet.collectStyles(<App {...props} />);
        };
    
        WrappedApp.propTypes = {
          pageContext: PropTypes.object.isRequired,
        };
    
        return WrappedApp;
      });

      const styleTags = sheet.getStyleElement()
      return { 
        ...page, 
        pageContext,
        styleTags,
        styles: (
          <React.Fragment>
            <style
              id="jss-server-side"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: pageContext.sheetsRegistry.toString() }}
            />
            {flush() || null}
          </React.Fragment>
        ),
      }
    }
    render () {
      return <Container {...this.props} />
    }
  }

export default withDocument
