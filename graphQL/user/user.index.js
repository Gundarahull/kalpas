const mutations = require("./user.mutations");
const queries = require("./user.queries");
const typeDefs = require("./user.typeDef");
const resolvers = require("./user.resolvers");

const User = {
  typeDefs,
  resolvers,
  mutations,
  queries,
};

module.exports = User;
