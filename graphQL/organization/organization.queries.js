const { gql } = require("apollo-server-express");

const queries = `
   organizations: [Organization!]!  
   organization__Members(id: ID!): Organization
`;

module.exports = queries;