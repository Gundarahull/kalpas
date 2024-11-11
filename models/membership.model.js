const { DataTypes } = require("sequelize");
const connectDB = require("../dbConfig/db");
const K_User = require("./user.model");
const K_Organization = require("./organization.model");

const K_Membership = connectDB.define(
  "K_Membership",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "K_Users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    organizationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "K_Organizations",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["member", "admin"]],
      },
    },
  },
  {
    timestamps: true,
  }
);

K_User.hasMany(K_Membership, { foreignKey: 'userId' });
K_Membership.belongsTo(K_User, { foreignKey: 'userId' });

K_Organization.hasMany(K_Membership, { foreignKey: 'organizationId' });
K_Membership.belongsTo(K_Organization, { foreignKey: 'organizationId' });







module.exports = K_Membership;
