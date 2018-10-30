import {ApolloProvider as OriginalApolloProvider} from 'react-apollo'
import {ApolloContext} from 'containers/contexts'

function ApolloProvider({ children, client }) {
  return (
    <OriginalApolloProvider client={client}>
      <ApolloContext.Provider value={client}>{children}</ApolloContext.Provider>
    </OriginalApolloProvider>
  );
}

export default ApolloProvider
