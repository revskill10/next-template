const gql = require('graphql-tag')

const userInfoSubscription = gql`
  subscription UserInfo($userId:uuid!){
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
  userInfoSubscription,
}
