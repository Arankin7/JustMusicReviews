const sequelize = require('../config/connection');
const { User } = require('../models');

const userData = [
    {
        username: 'testuser1',
        email: 'test1@gmail.com',
        password: 'password1234'
    },
    {
        username: 'testuser2',
        email: 'test2@gmail.com',
        password: 'password1234'
    },
    {
        username: 'testuser3',
        email: 'test3@gmail.com',
        password: 'password1234'
    },
    {
        username: 'testuser4',
        email: 'test4@gmail.com',
        password: 'password1234'
    },
    {
        username: 'testuser5',
        email: 'test5@gmail.com',
        password: 'password1234'
    }
]

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;