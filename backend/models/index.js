// models/index.js
const sequelize = require("../config/database");
const User = require("./user");
const Profile = require("./profile");
const Token = require("./token");
const Task = require("./task"); // Add this import

// Define relationships
User.hasOne(Profile);
Profile.belongsTo(User);

User.hasMany(Token);
Token.belongsTo(User);

User.hasMany(Task);
Task.belongsTo(User);

// Export all models and sequelize instance
module.exports = {
  sequelize,
  User,
  Profile,
  Token,
  Task, // Add Task to exports
};
