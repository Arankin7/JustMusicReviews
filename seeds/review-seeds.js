const { Review } = require('../models');

const reviewData = [
    {
        title: 'test title 1',
        user_id: 1,
        rating: 5,
        review_text: 'review text test 1'
    },
    {
        title: 'test title 2',
        user_id: 2,
        rating: 4,
        review_text: 'review text test 2'
    },
    {
        title: 'test title 3',
        user_id: 3,
        rating: 3,
        review_text: 'review text test 3'
    },
    {
        title: 'test title 4',
        user_id: 4,
        rating: 2,
        review_text: 'review text test 4'
    },
    {
        title: 'test title 5',
        user_idL: 5,
        rating: 1,
        review_text: 'review text test 5'
    }
]

const seedReviews = () => Review.bulkCreate(reviewData);

module.exports = seedReviews;