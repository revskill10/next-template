const gql = require('graphql-tag')

const userInfoQuery = gql`
  query UserInfo($userId:uuid!){
    v_user_info:v_user_info_3(where:{
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
module.exports = {
  userInfoQuery,
}
