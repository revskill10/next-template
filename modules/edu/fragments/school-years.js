const gql = require('graphql-tag')

const schoolYearsFragment = gql`
  fragment schoolYearsFragment on sche_school_years {
    key:id
    id
    name:school_year_name
    from_year
    to_year
  }
`

const schoolYearsQuery = gql`
  query {
    sche_school_years {
      ...schoolYearsFragment
    }
  }
  ${schoolYearsFragment}
`

const schoolYearsSubscription = gql`
  subscription {
    sche_school_years {
      ...schoolYearsFragment
    }
  }
  ${schoolYearsFragment}
`

const insertYearMutation = gql`
  mutation(
    $school_year_name:String!,
    $from_year:Int!,
    $to_year:Int!,
  ){
    insert_sche_school_years(objects:[{
      school_year_name:$school_year_name,
      from_year:$from_year,
      to_year:$to_year,
    }]){
      affected_rows
    }
  }
`
const insertYearMutationClient = gql`
  mutation(
    $from_year:Int!,
    $to_year:Int!,
  ){
    insertYear(
      from_year:$from_year,
      to_year:$to_year,
    )
  }
`

const schoolYearsMutation = {
  insertYearMutation,
  insertYearMutationClient,
}

module.exports = {
  schoolYearsFragment,
  schoolYearsQuery,
  schoolYearsSubscription,
  schoolYearsKey: 'sche_school_years',
  schoolYearsMutation,
}
