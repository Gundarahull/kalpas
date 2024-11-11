const { ApolloServer } = require("@apollo/server");
const User = require("./user/user.index");
const Organization = require("./organization/organization.index");
const Membership = require("./membership/membership.index");

//Initiating gQL Server
const startgQlServer = async () => {
  const gQlServer = new ApolloServer({
    typeDefs: `

    ${User.typeDefs}
    ${Organization.typeDefs}
    ${Membership.typeDefs}
            type Query{
            hello:String
            ${User.queries}
            ${Organization.queries}
            ${Membership.queries}
            }
            type Mutation{
            hello:String
            ${User.mutations}
            ${Organization.mutations}
            ${Membership.mutations}
            }
        `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Organization.resolvers.queries,
        ...Membership.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
        ...Organization.resolvers.mutations,
        ...Membership.resolvers.mutations,
      },
    },
  });
  await gQlServer.start();
  console.log("GraphQL Server Started");
  return gQlServer;
};

module.exports = startgQlServer;
