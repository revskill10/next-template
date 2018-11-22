import Authorization from 'containers/authorization'
import {Query} from 'react-apollo'
import CacheComponent from 'containers/cache-component'

const LiveComponent = ({
  allowedPermissions,
  query,
  subscription,
  context,
  children,
  variables,
  errorComponent = <div>Error</div>,
  loadingComponent = <div>...Loading</div>,
}) => {
  return (
    <Authorization
      allowedPermissions={allowedPermissions}
      >
      <Query query={query} variables={variables} fetchPolicy={'cache-only'} ssr={!process.browser}>
      {
        ({data, loading, error}) => {
          if (error) return errorComponent
          if (loading) return loadingComponent
          return (
            <CacheComponent
              subscription={subscription}
              variables={variables}
              context={context}
              cache={data}
              toCache={(data) =>  { return data }}
            >
              {children}
            </CacheComponent>
          )
        }
      }
      </Query>
    </Authorization>
  )
}

export default LiveComponent