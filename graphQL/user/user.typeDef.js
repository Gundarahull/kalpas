const { gql } = require("apollo-server-express");

const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
    organizations: [Organization]
  }


  type AuthPayload {
    token: String
    user: User
  }

  type regUser{
   id: ID!
    name: String!
    email: String!
  }

`;

module.exports = typeDefs;
