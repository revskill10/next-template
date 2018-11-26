const {
  insertAgeMutation
} = require('../../fragments')

const { 
  mutate,
} = require('../../../core/api/utils')


async function createAge(_, { age }, context, info) {
  const {
    adminClients  
  } = context
  const service = adminClients['eduManagerService']

  const variables = {
    age_name: age.age_name,
    from_month: age.duration.from_month,
    to_month: age.duration.to_month,
    is_active: age.is_active,
  }

  const res = await mutate({
    query: insertAgeMutation,
    variables,
  }, service)

  if (res.insert_sche_ages && res.insert_sche_ages.affected_rows > 0) {
    return true
  } else {
    return false
  }
}

module.exports = {
  createAge
}