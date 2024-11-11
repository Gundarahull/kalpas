const { gql } = require("apollo-server-express");
const mutations = `
    registerUser(name: String!, email: String!, password: String!): regUser
    loginUser(email: String!, password: String!): AuthPayload!
`;

module.exports = mutations;
