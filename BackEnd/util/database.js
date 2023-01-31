const dotenv = require('dotenv');
const Sequelize = require('sequelize');
dotenv.config();
const sequelize = new Sequelize('pay_wall', 'root', process.env.db_key, { dialect: 'mysql', host: 'localhost' });
module.exports = sequelize;