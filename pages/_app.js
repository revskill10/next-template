import withApolloClient from 'lib/with-apollo-client'
import withReduxStore from 'lib/with-redux-store'
import withApp from 'lib/with-app'
import AppContainer from 'containers/next-app'
import withNProgress from "next-nprogress";
import withUserAgent from 'lib/with-user-agent'

const msDelay = 100; // default is 300
const configOptions = { trickleSpeed: 70 };

import { compose } from "recompose";

export default compose(
  withReduxStore,  
  withApolloClient,
  withUserAgent,
  withNProgress(msDelay, configOptions),
  withApp,
)(AppContainer)
