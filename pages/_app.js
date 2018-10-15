import withApolloClient from 'lib/with-apollo-client'
import withReduxStore from 'lib/with-redux-store'
import withApp from 'lib/with-app'
import AppContainer from 'containers/next-app'
import withNProgress from "next-nprogress";

const msDelay = 100; // default is 300
const configOptions = { trickleSpeed: 50 };

import { compose } from "recompose";

export default compose(
  withReduxStore,  
  withApolloClient,
  withNProgress(msDelay, configOptions),
  withApp,
)(AppContainer)
