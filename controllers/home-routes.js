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
    .then(dbReviewData =>{
        const reviews = dbReviewData.map(review => review.get({plain: true}));
        res.render('homepage', {
            reviews,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err)
    });
});

router.get('/login', (req, res) =>{
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    else {
        res.render('login');
    }
});

router.get('/signup', (req, res) =>{
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    else{
        res.render('signup')
    }
});

router.get('/review/:id', (req, res) =>{
    Review.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'rating',
            'review_text',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'review_id', 'user_id', 'created_at'],
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
        // serialize the data
        const review = dbReviewData.get({plain: true});

        // pass the data to template
        res.render('single-review', {
            review,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;