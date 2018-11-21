
const {canViewReport} = require('./policies.config')
const { rule, shield, and, or, not } = require('graphql-shield')

const urlMap = {
  'reportingService': {
    uri: process.env.REPORTING_SERVICE_GRAPHQL_URL,
    subUri: process.env.REPORTING_SERVICE_SUBSCRIPTION_URL,
    headers: {
      "X-Hasura-Access-Key": process.env.HASURA_ACCESS_KEY,
      "Content-Type": "application/json",
    },
    prefix: 'reporting',
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
    uri: process.env.USER_SERVICE_GRAPHQL_URL,
    subUri: process.env.USER_SERVICE_SUBSCRIPTION_URL,
    headers: {
      "X-Hasura-Access-Key": process.env.HASURA_ACCESS_KEY,
      "Content-Type": "application/json",
    },
    prefix: null,
    permissions: null
  },
  'cmsService': {
    uri: process.env.CMS_GRAPHQL_URL,
    subUri: process.env.CMS_GRAPHQL_URL,
    headers: {
      'Authorization': `Bearer ${process.env.CMS_GRAPHQL_TOKEN}`
    }
  },
}

module.exports = urlMap