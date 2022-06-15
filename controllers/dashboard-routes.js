const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');

const { User, Review, Comment, Vote } = require('../models');

router.get('/', withAuth, (req, res) => {
    Review.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'rating',
            'review_text',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE review.id = vote.review_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'review_id',
                    'user_id',
                    'created_at'
                ],
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
        // Serialize data before passing to template
        const reviews = dbReviewData.map(review => review.get({plain: true}));

        res.render('dashboard', {reviews, loggedIn: true});
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});

// edit review
router.get('/edit/:id', withAuth, (req, res) =>{
    Review.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'rating',
            'review_text',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE review.id = vote.review_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'review_id',
                    'user_id',
                    'created_at'
                ],
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
        if(!dbReviewData){
            res.status(404).json({message: 'No review found with this ID'});
            return; 
        }
        const review = dbReviewData.get({ plain: true });
        res.render('edit-review', {
            review,
            loggedIn: true
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;