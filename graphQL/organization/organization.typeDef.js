const { gql } = require('apollo-server-express');
const typeDefs = `
  type Organization {
    id: ID!
    name: String!
    members: [Membership]
  }
`;

module.exports = typeDefs;
