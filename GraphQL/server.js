const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const typeDefs = require("./graphQL/typeDef");
const resolvers = require("./graphQL/resolvers");
const connectDB = require("./config/db");

const app = express();
connectDB();

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server started at http://localhost:4000/graphql");
  });
}

startServer();
