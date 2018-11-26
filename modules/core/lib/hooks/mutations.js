import {useApolloClient} from 'lib/hooks/apollo'

const useMutations = items => {
  const client = useApolloClient()
  let mutations = {}
  for (let k in items) {
    if (items.hasOwnProperty(k)) {
      mutations[k] = async ({variables}) => {
        return client.mutate({
          mutation: items[k],
          variables,
        })
      }
    }
  }
  
  return {
    mutations
  }
}

export default useMutations