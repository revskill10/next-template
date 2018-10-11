import { compose } from 'recompose'
import withApolloClient from 'lib/with-apollo-client'
import withReduxStore from 'lib/with-redux-store'
import withApp from 'lib/with-app'
import AppContainer from 'containers/app'

export default compose(
  withApolloClient,
  withReduxStore,
  withApp,
)(AppContainer)
