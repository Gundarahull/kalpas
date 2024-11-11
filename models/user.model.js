const { DataTypes } = require("sequelize");
const connectDB = require("../dbConfig/db");

const K_User = connectDB.define(
  "K_User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = K_User;
