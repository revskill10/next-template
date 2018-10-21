const path = require("path");
const { fileLoader, mergeTypes } = require("merge-graphql-schemas");

const typesArray = fileLoader(path.join(__dirname, "."), { recursive: true });
const typesMerged = mergeTypes(typesArray, { all: true });

module.export = typesMerged;
