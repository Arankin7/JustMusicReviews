const { Review, User, Vote, Comment } = require('../../models');
const router = require('express').Router();
const sequelize = require('../../config/connection.js');
const withAuth = require('../../utils/auth.js');

// get all reviews
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
    .then(dbReviewData => res.json(dbReviewData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// get one review
router.get('/:id', (req, res) => {
    Review.findOne({
        where: {
            id: req.params.id
        },
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
        if(!dbReviewData) {
            res.status(404).json({ message: 'Review not found' });
            return;
        }
        res.json(dbReviewData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// create review
router.post('/', withAuth, (req, res) => {
    if(req.session){
        Review.create({
            title: req.body.title,
            rating: req.body.rating,
            review_text: req.body.review_text,
            user_id: req.session.user_id
        })
        .then(dbReviewData => res.json(dbReviewData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
    }
})

// upvote review
router.put('/upvote', withAuth, (req, res) => {
    if(req.session) {
        Review.upvote({ ...req.body, user_id: req.session.user_id}, { Vote, Comment, User })
            .then(updatedReviewData => res.json(updatedReviewData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    }
})

// edit review
router.put('/:id', withAuth, (req, res) => {
    Review.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(updatedReviewData => {
        if(!updatedReviewData) {
            res.status(404).json({ message: 'Review not found' });
            return;
        }
        res.json(updatedReviewData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})

// delete review
router.delete('/:id', withAuth, (req, res) => {
    Review.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbReviewData => {
        if(!dbReviewData) {
            res.status(404).json({ message: 'Review not found' });
            return;
        }
        res.json(dbReviewData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})

module.exports = router;