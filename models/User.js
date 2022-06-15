const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const argon2 = require('argon2');

// Create the User model
class User extends Model {
    // Set up method to run on instance data (per user) to check password
    checkPassword(loginPw){
        return argon2.verify(this.password, loginPw);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // minimum 8 char password
                len: [8]
            }
        }
    },
    {
        hooks: {
            // Setup beforeCreate lifecycle "hook" functionality
            async beforeCreate(newUserData){
                try {
                    newUserData.password = await argon2.hash(newUserData.password, { hashLength: 10 });
                    return newUserData;
                }
                catch (err) {
                    alert(err);
                }
            },

            // setup beforeUpdate lifecycle "hook" functionality
            async beforeUpdate(updatedUserData){
                try {
                    updatedUserData.password = await argon2.hash(updatedUserData.password, { hashLength: 10 });
                    return updatedUserData;
                }
                catch (err) {
                    alert(err);
                }
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;