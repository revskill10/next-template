const gql = require('graphql-tag')

const userInfoSubscription = gql`
  subscription UserInfo($userId:uuid!){
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
module.exports = {
  userInfoSubscription,
}
