const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const router =  require('../controllers');
const User = require('./User')

// Create the Review Model

class Review extends Model {
    // add in vote logic
    static upvote(body, models){
        return models.Vote.create({
            user_id: body.user_id,
            review_id: body.review_id
        })
        .then(() => {
            return Review.findOne({
                where: {
                    id: body.review_id
                },
                attributes: [
                    'id',
                    'title',
                    'rating',
                    [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE review.id = vote.review_id'),
                    'vote_count'                
                    ]
                ]
            });
        });
    }
}

// use sequelize to create fields/columns
Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        // Rating field | User can rate the artist/song/album on a scale of 1-5
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        review_text: {
            // DataTypes.text allows review text to be more than 255 characters
            type: DataTypes.TEXT,
            // allowNull true this way users can leave textless reviews
            allowNull: true
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'review'
    }
)

module.exports = Review;