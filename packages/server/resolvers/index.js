const Mutation = require('./Mutation')
const Subscription = require('./Subscription')
const Query = require('./Query')

const resolvers = {
  Subscription,
  Mutation,
  Query,
}

module.exports = resolvers