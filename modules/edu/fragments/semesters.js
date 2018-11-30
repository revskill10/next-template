const gql = require('graphql-tag')
const {
  schoolYearsFragment
} = require('./school-years')

const semestersFragment = gql`
  fragment semestersFragment on sche_semesters {
    key:id
    id
    name:semester_name
    start_date
    to_date
    school_year:scheSchoolYearsByschoolYearId{
      ...schoolYearsFragment
    }
  }
  ${schoolYearsFragment}
`

const semestersQuery = gql`
  query {
    sche_semesters {
      ...semestersFragment
    }
  }
  ${semestersFragment}
`

const semestersSubscription = gql`
  subscription {
    sche_semesters {
      ...semestersFragment
    }
  }
  ${semestersFragment}
`

const insertSemesterMutation = gql`
  mutation(
    $semester_name:String!,
    $school_year_id:uuid!,
    $start_date:date!,
    $to_date:date!
  ){
    insert_sche_semesters(objects:[{
      semester_name:$semester_name,
      school_year_id:$school_year_id,
      start_date:$start_date,
      to_date:$to_date
    }]){
      affected_rows
    }
  }
`

const insertSemesterClientMutation = gql`
  mutation(
    $semester_name:String!,
    $school_year_id:String!,
    $start_date:Date!,
    $to_date:Date!
  ){
  insertSemester(
    semester_name:$semester_name,
    school_year_id:$school_year_id,
    start_date:$start_date,
    to_date:$to_date
  )
}
`

const semestersMutation = {
  insertSemesterMutation,
  insertSemesterClientMutation,
}

module.exports = {
  semestersFragment,
  semestersQuery,
  semestersSubscription,
  semestersMutation,
  semestersKey: 'sche_semesters'
}