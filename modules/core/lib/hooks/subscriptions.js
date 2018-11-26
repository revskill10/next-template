import {useEffect} from 'react'
import {useApolloClient} from 'lib/hooks/apollo'

const useSubscriptions = (items) => {
  const client = useApolloClient()
  useEffect(() => {
    let subscriptions = []
    items.forEach(item => {
      const query = item.query
      const subscription = item.subscription
      const tmp = client.subscribe({
        query: subscription
      }).subscribe({
        next({data}) {
          client.cache.writeQuery({
            query,
            data: item.mapper(data),
          })
          client.query({query})
        }
      })
      subscriptions.push(tmp)
    })

    return () => {
      subscriptions.forEach(item => {
        item.unsubscribe()
      })
    }
  }, [])
}

export default useSubscriptions