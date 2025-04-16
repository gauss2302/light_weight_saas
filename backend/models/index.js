// models/index.js
const sequelize = require("../config/database");
const User = require("./user");
const Profile = require("./profile");
const Token = require("./token");
const Task = require("./task");
const Project = require("./project");

// Define relationships
User.hasOne(Profile);
Profile.belongsTo(User);

User.hasMany(Token);
Token.belongsTo(User);

User.hasMany(Task);
Task.belongsTo(User);

User.hasMany(Project);
Project.belongsTo(User);

// Export all models and sequelize instance
module.exports = {
  sequelize,
  User,
  Profile,
  Token,
  Task,
  Project, // Add Project to exports
};
