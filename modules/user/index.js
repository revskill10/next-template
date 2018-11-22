const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const Query = require('./resolvers/Query')
const { combineResolvers } = require('graphql-resolvers')
const { importSchema } = require('graphql-import')
const {join} = require('path')
const makeResolver = require('../policies/make-resolver')
const { _assignRoles, _assignPermissions, _refreshCookies } = require('./policies')
const canAssignRoles = makeResolver({accessCheck: _assignRoles})
const canAssignPermissions = makeResolver({accessCheck: _assignPermissions})
const canRefreshCookies = makeResolver({accessCheck: _refreshCookies})

const {
  login,
  logout,
  refresh,
  refreshCookies,
  assignRoles,
  assignPermissions,
} = Mutation

const AuthorizedMutation = {
  login,
  logout,
  refresh,
  refreshCookies: combineResolvers(
    canRefreshCookies,
    refreshCookies,
  ),
  assignRoles: combineResolvers(
    canAssignRoles,
    assignRoles,
  ),
  assignPermissions: combineResolvers(
    canAssignPermissions,
    assignPermissions,
  )
}

const resolvers = {
  Subscription,
  Mutation: AuthorizedMutation,
  Query,
}

let localSchema = importSchema(join(__dirname, './typedefs/schema.graphql'))
const getCurrentUser = require('./utils/get-current-user')
module.exports = {
  localSchema,
  resolvers,
  getCurrentUser,
}
