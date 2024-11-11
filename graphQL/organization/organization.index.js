const mutations = require("./organization.mutations");
const queries = require("./organization.queries");
const typeDefs = require("./organization.typeDef");
const resolvers = require("./organization.resolvers");

const Organization = {
  typeDefs,
  resolvers,
  mutations,
  queries,
};

module.exports = Organization;