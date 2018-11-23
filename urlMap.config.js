const VIEW_QLGD_REPORT = require('./modules/report/policies')
const { rule, shield, and, or, not } = require('graphql-shield')
const makeResolver = require('./modules/policies/make-resolver')
const canViewReport = makeResolver({allowedPermissions: [VIEW_QLGD_REPORT], remote: true})
const urlMap = {
  'reportingService': {
    type: 'graphql',
    uri: process.env.REPORTING_SERVICE_GRAPHQL_URL,
    subUri: process.env.REPORTING_SERVICE_SUBSCRIPTION_URL,
    headers: {
      "X-Hasura-Access-Key": process.env.HASURA_ACCESS_KEY,
      "Content-Type": "application/json",
    },
    permissions: shield({
      'query_root': {
        v_all_lesson_class: rule()(canViewReport),
      },      
      'subscription_root': {
        v_all_lesson_class: rule()(canViewReport),
      },
    })
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
