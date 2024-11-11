const { DataTypes } = require("sequelize");
const connectDB = require("../dbConfig/db");

const K_Organization = connectDB.define(
  "K_Organization",
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
    createdById: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = K_Organization;
