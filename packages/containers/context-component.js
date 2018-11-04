import {Query} from 'react-apollo'

const ContextComponent = ({children, query, context}) => {
  const ContextProvider = context.Provider
  return (
    <Query query={query} fetchPolicy={'cache-only'}>
      {({data, loading}) => {
        if (loading) { return <div>...</div> }
        if (data) { return (
          <ContextProvider value={data}>
            {children}
          </ContextProvider>
        )}
        return null
      }}
    </Query>
  )
}

export default ContextComponent
