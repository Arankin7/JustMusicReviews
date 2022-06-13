const { Vote } = require('../models');

const voteData = [
    {
        user_id: 1,
        review_id: 1
    },
    {
        user_id: 1,
        review_id: 2
    },
    {
        user_id: 1,
        review_id: 3
    },
    {
        user_id: 1,
        review_id: 4
    },
    {
        user_id: 1,
        review_id: 5
    },
    {
        user_id: 2,
        review_id: 2
    },
    {
        user_id: 2,
        review_id: 3
    },
    {
        user_id: 2,
        review_id: 4
    },
    {
        user_id: 2,
        review_id: 5
    },
    {
        user_id: 3,
        review_id: 3
    },
    {
        user_id: 3,
        review_id: 4
    },
    {
        user_id: 3,
        review_id: 5
    },
    {
        user_id: 4,
        review_id: 4
    },
    {
        user_id: 4,
        review_id: 5
    },
    {
        user_id: 5,
        review_id: 5
    }
]

const seedVotes = () => Vote.bulkCreate(voteData);

module.exports = seedVotes;