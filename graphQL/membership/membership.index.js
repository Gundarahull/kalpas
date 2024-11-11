const mutations = require("./membership.mutations");
const queries = require("./membership.queries");
const typeDefs = require("./membership.typeDef");
const resolvers = require("./membership.resolvers");

const Membership = {
  typeDefs,
  resolvers,
  mutations,
  queries,
};

module.exports = Membership;
