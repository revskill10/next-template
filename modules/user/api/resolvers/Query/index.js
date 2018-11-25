const { 
  setCookie,
} = require('../../../../core/api/utils')

async function me(parents, args, context, info) {
  const { currentUser, token } = context
  setCookie(context, token)
  return  {
    currentUser,
    token
  }
}

module.exports = {
  me,
}
