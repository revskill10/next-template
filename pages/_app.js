import { compose } from "recompose";
import withApolloClient from 'lib/hocs/with-apollo-client'
import withReduxStore from 'lib/hocs/with-redux-store'
import withApp from 'lib/hocs/with-app'
import withCurrentUser from 'lib/hocs/with-current-user'
import withError from 'lib/hocs/with-error'
import withUserAgent from 'lib/hocs/with-user-agent'
import AppContainer from 'containers/next-app'

export default compose(  
  withError,
  withReduxStore,  
  withApolloClient,
  withCurrentUser,
  withUserAgent,
  withApp,
)(AppContainer)
