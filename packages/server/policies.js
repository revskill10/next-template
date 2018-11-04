const { rule, shield, and, or, not } = require('graphql-shield')

const isAuthenticated = rule()(async (parent, args, { currentUser }, info) => {
  return currentUser.roles === ['guest']
})

const isAdmin = rule()(async (parent, args, { currentUser }, info) => {
  return currentUser.roles.includes('admin')
})

const isStaff = rule()(async (parent, args, { currentUser }, info) => {
  return currentUser.roles.includes('staff')
})

// Permissions

const permissions = shield({
  Query: {
    frontPage: not(isAuthenticated),
    fruits: and(isAuthenticated, or(isAdmin, isEditor)),
    customers: and(isAuthenticated, isAdmin),
  },
  Mutation: {
    addFruitToBasket: isAuthenticated,
  },
  Fruit: isAuthenticated,
  Customer: isAdmin,
})

module.exports = permissions