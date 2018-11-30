import dynamic from 'next/dynamic'
//import Main from 'modules/edu/containers/main'
const Main = dynamic(import('modules/edu/containers/main'))
import {
  query,
  mutation,
  subscription,
} from 'modules/edu/fragments'
import context from 'modules/edu/contexts'
import withContext from 'lib/hocs/with-context'

export const getInitialProps = async({apolloClient, fetchPolicy}) => {
  await apolloClient.query({query, ...fetchPolicy})
}

export default withContext({
  query,
  mutation,
  subscription,
  context,
})(Main)
