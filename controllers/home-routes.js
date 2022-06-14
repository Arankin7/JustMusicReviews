const router = require('express').Router();
const sequelize = require('../config/connection');
const { Comment, Review, User } = require('../models');

router.get('/', (req, res) => {
    Review.findAll({
        attributes: [
            'id',
            'title',
            'rating',
            'review-text',            
        ], 
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbReviewData => {
        const reviews = dbReviewData.map(review => review.get({ plain: true}));
        res.render('homepage', {
            reviews,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

module.exports = router;