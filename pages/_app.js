import { compose } from 'recompose'
import withApolloClient from 'lib/with-apollo-client'
import withReduxStore from 'lib/with-redux-store'
import withApp from 'lib/with-app'
import AppContainer from 'containers/app'
/*
import LocalAppContainer from 'containers/localApp'

const normalApp = compose(
  withApolloClient,
  withReduxStore,
  withApp,
)(AppContainer)

const localApp = compose(
  withApolloClient,
  withReduxStore,
  withApp,
)(LocalAppContainer)

const defaultApp = process.env.NODE_ENV === 'local' ? localApp : normalApp

export default defaultApp
*/
export default compose(
  withApolloClient,
  withReduxStore,
  withApp,
)(AppContainer)