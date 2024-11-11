const { gql } = require("apollo-server-express");
const mutations = `
   createOrganization(name: String!): Organization! 
`;

module.exports = mutations;
