const { combineResolvers } = require('graphql-resolvers')
const { importSchema } = require('graphql-import')
const {join} = require('path')
const { makeExecutableSchema } = require('graphql-tools');
const Mutation = require('./resolvers/mutation')
const resolvers = {
  Mutation,  
}
let typeDefs = importSchema(join(__dirname, './typedefs/schema.graphql'))
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = {
  schema,
}
