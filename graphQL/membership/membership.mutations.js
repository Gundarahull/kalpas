const { gql } = require("apollo-server-express");
const mutations = `
    addMemberToOrganization(orgId: ID!, userId: ID!, role: String!): Membership! 
`;

module.exports = mutations;
