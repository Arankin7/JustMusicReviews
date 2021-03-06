const seedUsers = require('./user-seeds');
const seedReviews = require('./review-seeds');
const seedComments = require('./comment-seeds');
const seedVotes = require('./vote-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('=========================');
    await seedUsers();
    console.log('===========USERS SEEDED==============');
    await seedReviews();
    console.log('===========REVIEWS SEEDED==============');
    await seedComments();
    console.log('===========COMMENTS SEEDED==============');
    await seedVotes();
    console.log('===========VOTES SEEDED==============');

    process.exit(0);
};

seedAll();