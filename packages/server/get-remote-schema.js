const { introspectSchema, makeRemoteExecutableSchema } = require('graphql-tools')

async function getRemoteSchema ({adminLink, link}) {
  const schema = await introspectSchema(adminLink);

  const executableSchema = makeRemoteExecutableSchema({
    schema,
    link,
  });

  return executableSchema;
}

module.exports = {
  getRemoteSchema
}