const Sequelize = require('sequelize');

require('dotenv').config();

let sequelize;

// Don't forget to create a .env file with 
// DB_NAME='music_review_db'
// DB_USER='root'
// DB_PASSWORD='(YOUR PASSWORD)'

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
  } else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    });
  }
  
  module.exports = sequelize;