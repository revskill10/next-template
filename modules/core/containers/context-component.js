import {memo} from 'react'
import {Query} from 'react-apollo'

const ContextComponent = ({children, query, context, process}) => {
  const ContextProvider = context.Provider
  return (
    <Query query={query} fetchPolicy={'cache-only'}>
      {({data, loading}) => {
        if (loading) { return <div>...</div> }
        if (data) { 
          if (process && typeof(process) === 'function') {
            const tmp = process(data)
            return (
              <ContextProvider value={tmp}>
                {children}
              </ContextProvider>
            )
          } else {
            return (
              <ContextProvider value={data}>
                {children}
              </ContextProvider>
            )
          }
        } else {
          return null
        }
      }}
    </Query>
  )
}

export default memo(ContextComponent)
