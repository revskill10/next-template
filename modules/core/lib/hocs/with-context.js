import useSubscriptions from 'lib/hooks/subscriptions'
import useMutations from 'lib/hooks/mutations'
import ContextComponent from 'containers/context-component'

const withContext = ({
  query,
  mutation,
  subscription,
  context,
}) => Component => {
  return (props) => {
    const {mutations} = useMutations(mutation)

    useSubscriptions(subscription)

    return (
      <ContextComponent
        query={query}
        mutations={mutations}
        context={context}
      >
        <Component {...props} />
      </ContextComponent>
    )
  }      
}

export default withContext