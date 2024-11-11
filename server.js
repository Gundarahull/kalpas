require("dotenv").config();
const express = require("express");
const { expressMiddleware } = require("@apollo/server/express4");
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const startgQlServer = require("./graphQL/graphQlServer");
const dbConfig = require("./dbConfig/config");
const K_User = require("./models/user.model");
const jwt = require("jsonwebtoken");
const secret_key = "12345qwertyasdfgzxcvb";

const startServer = async () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  //DB=PostGreSQL
  dbConfig();

  //gQl Server
  const InitializeGQLServer = await startgQlServer();
  app.use(
    "/graphql",
    expressMiddleware(InitializeGQLServer, {
      context: async ({ req }) => {
        // Get the token from headers
        const token = req.headers.authorization || "";

        if (token) {
          try {
            const decoded = jwt.verify(token, secret_key);
            const user = await K_User.findByPk(decoded.id, {
              raw: true,
            });

            return { user };
          } catch (error) {
            console.error("Invalid token:", error);
          }
        }
        return {};
      },
    })
  );

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

//Calling the fUnction
startServer();
