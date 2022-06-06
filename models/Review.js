const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const router =  require('../controllers');
const User = require('./User')

// Create the Review Model

class Review extends Model {}

// use sequelize to create fields/columns
Review.init({})

module.exports = Review;