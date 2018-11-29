const {
  mutation
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
    query: mutation['insertAgeMutation'],
    variables,
  }, service)

  if (res.insert_sche_ages && res.insert_sche_ages.affected_rows > 0) {
    return true
  } else {
    return false
  }
}

async function insertYear(_, {from_year, to_year}, context, info) {
  const {
    adminClients  
  } = context
  const service = adminClients['eduManagerService']
  const variables = {
    school_year_name: `${from_year} - ${to_year}`,
    from_year,
    to_year,
  }
  const query = mutation['insertYearMutation']
  const res = await mutate({
    query,
    variables,
  }, service)

  if (res.insert_sche_school_years && res.insert_sche_school_years.affected_rows > 0) {
    return true
  } else {
    return false
  }
}

module.exports = {
  createAge,
  insertYear
}