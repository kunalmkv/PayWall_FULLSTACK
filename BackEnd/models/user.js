const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    userName: { type: Sequelize.STRING },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,

    }
});
module.exports = users;