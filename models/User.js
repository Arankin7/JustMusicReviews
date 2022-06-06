const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// Create the User model
class User extends Model {
    // Set up method to run on instance data (per user) to check password
}

User.init({})

module.exports = User;