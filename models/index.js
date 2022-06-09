const User = require('./User');
const Review = require('./Review');
const Comment = require('./Comment');
const Vote = require('./Vote');

// create associations between models

User.hasMany(Review, {
    foreignKey: 'user_id'
});

Review.belongsTo(User, {
    foreignKey: 'user_id'
});

User.belongsToMany(Review, {
    through: Vote,
    as: 'voted_review',
    foreignKey: 'user_id'
});

Review.belongsToMany(User, {
    through: Vote,
    as: 'voted_review',
    foreignKey: 'review_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Review, {
    foreignKey: 'review_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Review.hasMany(Vote, {
    foreignKey: 'review_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Review, {
    foreignKey: 'review_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Review.hasMany(Comment, {
    foreignKey: 'review_id'
});


module.exports = { User, Review, Comment, Vote};
