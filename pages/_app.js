import { compose } from 'recompose'
import withApolloClient from '../lib/with-apollo-client'
import withReduxStore from '../lib/with-redux-store'
import AppContainer from '../containers/app'
import withApp from '../lib/with-app'

export default compose(
  withApolloClient,
  withReduxStore,
  withApp,
)(AppContainer)
