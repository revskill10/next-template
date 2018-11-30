const gql = require('graphql-tag')

const classRoomsFragment = gql`
  fragment classRoomsFragment on sche_classrooms {
    key:id
    id
    name:classroom_name
    amount
    building
    floor
  }
`

const classRoomsQuery = gql`
  query {
    sche_classrooms {
      ...classRoomsFragment
    }
  }
  ${classRoomsFragment}
`

const classRoomsSubscription = gql`
  subscription {
    sche_classrooms {
      ...classRoomsFragment
    }
  }
  ${classRoomsFragment}
`

const insertClassRoomMutation = gql`
  mutation(
    $classroom_name:String!,
    $amount:Int!,
    $building:String!,
    $floor:Int!
  ){
  insert_sche_classrooms(objects:[{
    classroom_name:$classroom_name,
    amount:$amount,
    building:$building,
    floor:$floor
  }]){
    affected_rows
  }
}
`

const insertClassRoomClientMutation = gql`
  mutation(
    $classroom_name:String!,
    $amount:Int!,
    $building:String!,
    $floor:Int!
  ){
  insertClassRoom(
    classroom_name:$classroom_name,
    amount:$amount,
    building:$building,
    floor:$floor
  )
}
`

const classRoomsMutation = {
  insertClassRoomMutation,
  insertClassRoomClientMutation,
}

module.exports = {
  classRoomsFragment,
  classRoomsQuery,
  classRoomsSubscription,
  classRoomsMutation,
  classRoomsKey: 'sche_classrooms'
}