const User = require('./User');
const Review = require('./Review');
const Comment = require('./Comment');
const Vote = require('./Vote');

// create associations between models

User.hasMany(Review, {
    foreignKey: 'user_id'
});

Review.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

User.belongsToMany(Review, {
    through: Vote,
    as: 'voted_review',
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Review.belongsToMany(User, {
    through: Vote,
    as: 'voted_review',
    foreignKey: 'review_id',
    onDelete: 'SET NULL'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Vote.belongsTo(Review, {
    foreignKey: 'review_id',
    onDelete: 'SET NULL'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Review.hasMany(Vote, {
    foreignKey: 'review_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Comment.belongsTo(Review, {
    foreignKey: 'review_id',
    onDelete: 'SET NULL'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Review.hasMany(Comment, {
    foreignKey: 'review_id',
});


module.exports = { User, Review, Comment, Vote};
