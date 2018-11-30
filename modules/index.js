const { createServer, startServer } = require('./core/api/create-graphql-server')
const createSchema = require('./core/api/create-schema')  
async function createApiServer({urlMap, localSchema, dev}) {
  const {schema, adminClients} = await createSchema(urlMap, localSchema.schema)
  const graphqlServer = await createServer({
    dev, schema, adminClients, getCurrentUser: localSchema.getCurrentUser(adminClients)
  })
  
  return graphqlServer;
}

module.exports = {
  createApiServer,
  startServer,
}

