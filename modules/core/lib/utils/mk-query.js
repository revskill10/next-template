const gql = require('graphql-tag')
const mkQuery = (queryType, columns, dataKey, limit = 100) => {
  const fields = columns.join("\n")
  return gql`
  ${queryType} {
    ${dataKey}(limit: ${limit}) {
      ${fields}
    }
  }
`
}

export default mkQuery
