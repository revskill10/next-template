const urlMap = {
  'reportingService': {
    type: 'graphql',
    uri: process.env.REPORTING_SERVICE_GRAPHQL_URL,
    subUri: process.env.REPORTING_SERVICE_SUBSCRIPTION_URL,
    headers: {
      "X-Hasura-Access-Key": process.env.HASURA_ACCESS_KEY,
      "Content-Type": "application/json",
    },
    permissions: null,
  },
  'userService': {
    type: 'graphql',
    uri: process.env.USER_SERVICE_GRAPHQL_URL,
    subUri: process.env.USER_SERVICE_SUBSCRIPTION_URL,
    headers: {
      "X-Hasura-Access-Key": process.env.HASURA_ACCESS_KEY,
      "Content-Type": "application/json",
    },
    permissions: null
  },
  'scheduleService': {
    type: 'graphql',
    uri: process.env.SCHEDULE_SERVICE_GRAPHQL_URL,
    subUri: process.env.SCHEDULE_SERVICE_SUBSCRIPTION_URL,
    headers: {
      "X-Hasura-Access-Key": process.env.HASURA_ACCESS_KEY,
      "Content-Type": "application/json",
    },
    permissions: null
  },
  'attendanceService': {
    type: 'graphql',
    uri: process.env.SCHEDULE_SERVICE_GRAPHQL_URL,
    subUri: process.env.SCHEDULE_SERVICE_SUBSCRIPTION_URL,
    headers: {
      "X-Hasura-Access-Key": process.env.HASURA_ACCESS_KEY,
      "Content-Type": "application/json",
    },
    permissions: null
  },
  'eduManagerService': {
    type: 'graphql',
    uri: process.env.EDU_SERVICE_GRAPHQL_URL,
    subUri: process.env.EDU_SERVICE_SUBSCRIPTION_URL,
    headers: {
      "X-Hasura-Access-Key": process.env.HASURA_ACCESS_KEY,
      "Content-Type": "application/json",
    },
    permissions: null
  },
  'cmsService': {
    type: 'graphql',
    uri: process.env.CMS_GRAPHQL_URL,
    subUri: process.env.CMS_GRAPHQL_URL,
    headers: {
      'Authorization': `Bearer ${process.env.CMS_GRAPHQL_TOKEN}`
    },
    permissions: null,
  },
  'eduService': {
    type: 'soap',
    url: process.env.EDU_URL
  },
}

module.exports = urlMap
