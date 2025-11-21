const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphQl/typeDefs");
const resolvers = require("./graphQl/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let user = null;
    const auth = req.headers.authorization;
    if (auth === "huii") {
      user = {
        id: 1,
        name: "rahul",
        role:"superAdmin"
      };
    }
    if (auth === "zuii") {
      user = {
        id: 2,
        name: "looser",
        role:"admin"
      };
    }
    return {
      user,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server started at ${url}`);
});

//graphql-depth-limit - to restrict the nested Depth....
