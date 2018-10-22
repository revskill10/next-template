import withApolloClient from 'lib/with-apollo-client'
import withReduxStore from 'lib/with-redux-store'
import withApp from 'lib/with-app'
import AppContainer from 'containers/next-app'
import withNProgress from "next-nprogress";
import withUserAgent from 'lib/with-user-agent'
import { compose } from "recompose";
import i18n from 'lib/i18n';
import languagePathCorrection from 'lib/i18n/language-path-correction';
import { translation } from 'lib/i18n/config';
import Router from 'next/router';
import withCurrentUser from 'lib/with-current-user'

const { enableSubpaths } = translation;
const msDelay = 100; // default is 300
const configOptions = { trickleSpeed: 70 };

if (enableSubpaths) {
  Router.events.on('routeChangeStart', originalRoute => {
    const correctedPath = languagePathCorrection(originalRoute);
    if (correctedPath !== originalRoute) {
      Router.push(correctedPath, correctedPath, { shallow: true });
    }
  });

  i18n.on('languageChanged', lng => {
    if (process.browser) {
      const originalRoute = window.location.pathname;
      const correctedPath = languagePathCorrection(originalRoute, lng);
      if (correctedPath !== originalRoute) {
        Router.push(correctedPath, correctedPath, { shallow: true });
      }
    }
  });
}

export default compose(  
  withReduxStore,  
  withApolloClient,
  withCurrentUser,
  withUserAgent,
  withNProgress(msDelay, configOptions),  
  withApp,
)(AppContainer)
