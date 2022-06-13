const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth.js');

// get all comments
router.get('/', (req, res) => {
    Comment.findAll()
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

// create comment
router.post('/', withAuth, (req, res) => {
    if(req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            review_id: req.body.review_id,
            user_id: req.body.user_id
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    }
})

// delete comment
router.delete('/:id', withAuth, (req, res) => {
    if(req.session) {
        Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbCommentData => {
            if(!dbCommentData) {
                res.status(404).json(err);
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    }
})

module.exports = router;