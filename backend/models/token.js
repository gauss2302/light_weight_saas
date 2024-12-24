const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Token = sequelize.define(
  "Token",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("refresh", "reset", "verification"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Token;
