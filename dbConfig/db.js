const { Sequelize } = require("sequelize");
require("dotenv").config();

const connectDB = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PWD,
  {
    host: process.env.SERVER_NAME,
    dialect: process.env.DIALECT,
  }
);

module.exports = connectDB;
