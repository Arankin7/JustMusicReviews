const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        review_id: 5,
        comment_text: 'test comment 1'
    },
    {
        user_id: 2,
        review_id: 4,
        comment_text: 'test comment 2'
    },
    {
        user_id: 3,
        review_id: 3,
        comment_text: 'test comment 3'
    },
    {
        user_id: 4,
        review_id: 2,
        comment_text: 'test comment 4'
    },
    {
        user_id: 5,
        review_id: 1,
        comment_text: 'test comment 5'
    }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments