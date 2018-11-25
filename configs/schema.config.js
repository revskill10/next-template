const { mergeSchemas} = require('graphql-tools')
const userSchema = require('../modules/user/api')
const eduSchema = require('../modules/edu/api')

const schema = mergeSchemas({
  schemas: [
    userSchema.schema,
    eduSchema.schema
  ]
})

module.exports = {
  schema,
  getCurrentUser: userSchema.getCurrentUser,
}