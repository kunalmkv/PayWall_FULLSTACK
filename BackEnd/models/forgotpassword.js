const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const forgotpw = sequelize.define('forgotpasswords', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: Sequelize.STRING,
    token: {
        type: Sequelize.STRING
    }

})

module.exports = forgotpw;