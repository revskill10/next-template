const gql = require('graphql-tag')
const {
  semestersFragment
} = require('./semesters')

const weeksFragment = gql`
  fragment weeksFragment on sche_weeks {
    key:id
    id
    week
    start_date
    end_date
    semester:scheSemestersBysemesterId{
      ...semestersFragment
    }
  }
  ${semestersFragment}
`

const weeksQuery = gql`
  query {
    sche_weeks {
      ...weeksFragment
    }
  }
  ${weeksFragment}
`

const weeksSubscription = gql`
  subscription {
    sche_weeks {
      ...weeksFragment
    }
  }
  ${weeksFragment}
`

const insertWeekMutation = gql`
  mutation(
    $week:Int!,
    $semester_id:uuid!,
    $start_date:date!,
    $end_date:date!
  ){
    insert_sche_weeks(objects:[{
      week:$week,
      semester_id:$semester_id,
      start_date:$start_date,
      end_date:$end_date
    }]){
      affected_rows
    }
  }
`

const insertWeekClientMutation = gql`
  mutation(
    $week:Int!,
    $semester_id:String!,
    $start_date:Date!,
    $end_date:Date!
  ){
  insertWeek(
    week:$week,
    semester_id:$semester_id,
    start_date:$start_date,
    end_date:$end_date
  )
}
`

const weeksMutation = {
  insertWeekMutation,
  insertWeekClientMutation,
}

module.exports = {
  weeksFragment,
  weeksQuery,
  weeksSubscription,
  weeksMutation,
  weeksKey: 'sche_weeks'
}