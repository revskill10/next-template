import { compose } from "recompose";
import Router from 'next/router';

import withApolloClient from 'lib/hocs/with-apollo-client'
import withReduxStore from 'lib/hocs/with-redux-store'
import withApp from 'lib/hocs/with-app'
import withCurrentUser from 'lib/hocs/with-current-user'
import withError from 'lib/hocs/with-error'
import withUserAgent from 'lib/hocs/with-user-agent'

import AppContainer from 'containers/next-app'

import i18n from 'lib/i18n';
import languagePathCorrection from 'lib/i18n/language-path-correction';
import { translation } from 'lib/i18n/config';

const { enableSubpaths } = translation;

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
  withError,
  withReduxStore,  
  withApolloClient,
  withCurrentUser,
  withUserAgent,
  withApp,
)(AppContainer)
