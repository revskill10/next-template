const gql = require('graphql-tag')

const userInfoQuery = gql`
  query UserInfo($userId:uuid!){
    v_user_info(where:{
      user_id:{
        _eq:$userId
      }
    }){
    	user_id
      name
      roles
      permissions
    }
  }
`

const upsertUserQuery = gql`
  mutation upsert_user($name:String!, $email:String!, $family_name:String,$given_name:String,$picture:String,$googleId:String!,$roleId:uuid!) {
    insert_users(
      objects: [
        {name: $name, email:$email, familyName:$family_name, givenName:$given_name,imageUrl:$picture,googleId:$googleId,
        membershipssByuserId:{
          data:[
            {
              role_id: $roleId, 
              active:true
      			}
          ],
            on_conflict:{
              constraint:user_role_idx,
              update_columns:active
            }
          }
        }
      ],
      on_conflict: {
        constraint: users_email_key,
        update_columns: [name, familyName, givenName, imageUrl]
      }
    ) {
      affected_rows
      returning{
        id
        name
        imageUrl
        info{
          name
          roles
          permissions
          user_id
        }
      }
    }
  }
`

const setOnlineStatusMutation = gql`
mutation SetOnlineStatus($userId: uuid!, $active:Boolean!){
  insert_memberships(
    objects:[
      {
        user_id:$userId,
        role_id: "c05634da-723c-484e-9d4c-52702e963849", 
        active:$active
      }
    ],
    on_conflict:{
      constraint:user_role_idx,
      update_columns:active
    }
  ){
    returning{
      id
    }
  }
}
`

module.exports = {
  upsertUserQuery,
  setOnlineStatusMutation,
  userInfoQuery,
}