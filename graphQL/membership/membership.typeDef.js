const { gql } = require("apollo-server-express");

const typeDefs = `
  type Membership {
    id: ID!
    user: User!
    organization: Organization!
    role: String!
  }

    
`;

module.exports = typeDefs;
