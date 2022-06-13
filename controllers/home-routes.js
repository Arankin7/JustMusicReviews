const router =  require('express').Router();
const sequelize = require('../config/connection');

const { User, Review, Comment, Vote } = require('../models');

router.get('/', (req, res) => {
    
    Review.findAll({
        attributes: [
            'id',
            'title',
            'rating',
            'review_text',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE review.id = vote.review_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'review_id', 'user_id'],
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
    // STILL NEED TO CHANGE THE RESPONSE TO RENDER THE HOMEPAGE RATHER THAN THE DASHBOARD
    .then(dbReviewData =>{
        const reviews = dbReviewData.map(review => review.get({plain: true}));
        res.render('dashboard', {
            reviews,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err)
    });
});


module.exports = router;