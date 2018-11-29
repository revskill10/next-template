const gql = require('graphql-tag')
const {
  agesFragment,
  agesQuery,
  agesSubscription,
  agesMutation,
  agesKey,
} = require('./ages')

const {
  schoolYearsFragment,
  schoolYearsQuery,
  schoolYearsSubscription,
  schoolYearsKey,
  schoolYearsMutation,
} = require('./school-years')

const query = gql`
query {
  ${agesKey} {
    ...agesFragment
  }
  ${schoolYearsKey} {
    ...schoolYearsFragment
  }
}
${agesFragment}
${schoolYearsFragment}
`

const mutation = {
  ...agesMutation,
  ...schoolYearsMutation,
}

const subscription = [
  {
    query: agesQuery,
    subscription: agesSubscription,
    key: agesKey,
  },
  {
    query: schoolYearsQuery,
    subscription: schoolYearsSubscription,
    key: schoolYearsKey,
  }
]

module.exports = {
  mutation,
  query,
  subscription,
}