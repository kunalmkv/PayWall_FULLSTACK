const Sequelize = require('sequelize');
const sequelize = new Sequelize('pay_wall', 'root', 'India@123', { dialect: 'mysql', host: 'localhost' });
module.exports = sequelize;