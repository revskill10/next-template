const gql = require('graphql-tag')

const userInfoQuery = gql`
  query UserInfo($userId:uuid!, $roleId:uuid!){
    user_info:v_user_info_3(where:{
      user_id:{
        _eq:$userId
      }
    }){
    	user_id
      name
      roles
      permissions
      active
    }
  }
`

const upsertUserQuery = gql`
  mutation upsert_user($name:String!, $email:String!, $family_name:String,$given_name:String,$picture:String,$googleId:String!,$active:Boolean!) {
    insert_users(
      objects: [
        {name: $name, email:$email, familyName:$family_name, givenName:$given_name,imageUrl:$picture,googleId:$googleId,active:$active}        
      ],
      on_conflict: {
        constraint: users_email_key,
        update_columns: [name, familyName, givenName, imageUrl,active]
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
          active
        }
      }
    }
  }
`

const logoutMutation = gql`
  mutation logout($userId:uuid!){
  update_users(
    _set:{active:false},
    where:{id:{_eq:$userId}}
  ){
    affected_rows
  }
}
`

const assignRolesMutation = gql`
mutation UpsertMembership($user_id:uuid!, $role_ids:[uuid!]!,$input:[memberships_insert_input!]!){ 
  delete_memberships(
    where:{
      _and:{
      	user_id:{_eq:$user_id},
      	_not:{role_id:{_in:$role_ids}}  
      }      
    }
  ){
    affected_rows
  } 
  insert_memberships(
    objects:$input
    on_conflict:{
      action:ignore,
      constraint:user_role_idx
    }
  ){
    affected_rows
  }
  
}
`


const assignPermissionsMutation = gql`
mutation UpsertRolePermissions($role_id:uuid!, $permission_ids:[Int!]!,$input:[role_permissions_insert_input!]!){ 
  delete_role_permissions(
    where:{
      _and:{
      	role_id:{_eq:$role_id},
      	_not:{permission_id:{_in:$permission_ids}}  
      }      
    }
  ){
    affected_rows
  } 
  insert_role_permissions(
    objects:$input
    on_conflict:{
      action:ignore,
      constraint:role_permission_idx
    }
  ){
    affected_rows
  }
}
`

module.exports = {
  upsertUserQuery,
  userInfoQuery,
  assignRolesMutation,
  assignPermissionsMutation,
  logoutMutation,
}