const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const Query = require('./resolvers/Query')
const { importSchema } = require('graphql-import')
const {join} = require('path')
const { makeExecutableSchema } = require('graphql-tools');
let typeDefs = importSchema(join(__dirname, './typedefs/schema.graphql'))

const resolvers = {
  Subscription,
  Mutation,
  Query,
}
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const getCurrentUser = require('./utils/get-current-user')
module.exports = {
  schema,
  getCurrentUser,
}
