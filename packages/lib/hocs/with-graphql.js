import {graphql} from 'react-apollo'

const withGraphql = ({perPage = 4, query=dataQuery, key='posts'}) => Component => {
  const variables = {
    skip: 0,
    first: perPage,
  }
  return graphql(query, {
    options: {
      variables,
    },
    props: ({ data }) => ({
      data,
      loadMore: () => {
        return data.fetchMore({
          variables: {
            skip: data[key].length
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
              return previousResult
            }
            return Object.assign({}, previousResult, {
              [key]: [...previousResult[key], ...fetchMoreResult[key]]
            })
          }
        })
      }
    })
  })(Component)
}

export default withGraphql
