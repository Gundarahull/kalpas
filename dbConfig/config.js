const connectDB = require("./db");

const dbConfig = async () => {
  //for Authentication the DB
  connectDB
    .authenticate()
    .then(() => {
      console.log("Database Connected SuccessFully");
    })
    .catch((err) => {
      console.log("Error While Connecting to Database!", err);
    });

  //For Tbales
  connectDB
    .sync()
    .then(() => {
      console.log("Database Tables Synced Successfully");
    })
    .catch((err) => {
      console.error("Error syncing database tables:", err);
    });
};

module.exports = dbConfig;
