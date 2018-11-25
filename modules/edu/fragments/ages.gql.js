const gql = require('graphql-tag')

const insertAgeMutation = gql`
  mutation(
    $age_name:String!,
    $from_month:Int!,
    $to_month:Int!,
    $is_active:Boolean
  ){
  insert_sche_ages(objects:[{
    age_name:$age_name,
    from_month:$from_month,
    to_month:$to_month,
    is_active:$is_active
  }]){
    affected_rows
  }
}
`

const insertAgeClientMutation = gql`
  mutation(
    $age_name:String!,
    $duration: DurationInput!,
    $is_active:Boolean!
  ){
    createAge(age: {
      age_name: $age_name,
      duration: $duration,
      is_active: $is_active
    })
}
`

module.exports = {
  insertAgeMutation,
  insertAgeClientMutation,
}