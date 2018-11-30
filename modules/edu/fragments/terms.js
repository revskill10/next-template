const gql = require('graphql-tag')
const {
  semestersFragment
} = require('./semesters')

const termsFragment = gql`
  fragment termsFragment on sche_terms {
    key:id
    id
    start_date
    end_date
    semester:scheSemestersBysemesterId{
      ...semestersFragment
    }
  }
  ${semestersFragment}
`

const termsQuery = gql`
  query {
    sche_terms {
      ...termsFragment
    }
  }
  ${termsFragment}
`

const termsSubscription = gql`
  subscription {
    sche_terms {
      ...termsFragment
    }
  }
  ${termsFragment}
`

const insertTermMutation = gql`
  mutation(
    $semester_id:uuid!,
    $start_date:date!,
    $end_date:date!
  ){
    insert_sche_terms(objects:[{
      semester_id:$semester_id,
      start_date:$start_date,
      end_date:$end_date
    }]){
      affected_rows
    }
  }
`

const insertTermClientMutation = gql`
  mutation(
    $semester_id:String!,
    $start_date:Date!,
    $end_date:Date!
  ){
  insertTerm(
    semester_id:$semester_id,
    start_date:$start_date,
    end_date:$end_date
  )
}
`

const termsMutation = {
  insertTermMutation,
  insertTermClientMutation,
}

module.exports = {
  termsFragment,
  termsQuery,
  termsSubscription,
  termsMutation,
  termsKey: 'sche_terms'
}