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

async function insertClassRoom(_, args, context, info) {
  const {
    adminClients  
  } = context
  const service = adminClients['eduManagerService']
  const variables = args
  const query = mutation['insertClassRoomMutation']
  const res = await mutate({
    query,
    variables,
  }, service)

  if (res.insert_sche_class_rooms && res.insert_sche_class_rooms.affected_rows > 0) {
    return true
  } else {
    return false
  }
}

async function insertSemester(_, args, context, info) {
  const {
    adminClients  
  } = context
  const service = adminClients['eduManagerService']
  const variables = args
  const query = mutation['insertSemesterMutation']
  const res = await mutate({
    query,
    variables,
  }, service)

  if (res.insert_sche_semesters && res.insert_sche_semesters.affected_rows > 0) {
    return true
  } else {
    return false
  }
}


async function insertTerm(_, args, context, info) {
  const {
    adminClients  
  } = context
  const service = adminClients['eduManagerService']
  const variables = args
  const query = mutation['insertTermMutation']
  const res = await mutate({
    query,
    variables,
  }, service)

  if (res.insert_sche_terms && res.insert_sche_terms.affected_rows > 0) {
    return true
  } else {
    return false
  }
}

async function insertWeek(_, args, context, info) {
  const {
    adminClients  
  } = context
  const service = adminClients['eduManagerService']
  const variables = args
  const query = mutation['insertWeekMutation']
  const res = await mutate({
    query,
    variables,
  }, service)

  if (res.insert_sche_weeks && res.insert_sche_weeks.affected_rows > 0) {
    return true
  } else {
    return false
  }
}

module.exports = {
  createAge,
  insertYear,
  insertClassRoom,
  insertSemester,
  insertTerm,
  insertWeek,
}