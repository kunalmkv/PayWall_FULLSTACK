const User = require('../models/user');
const Wallet = require('../models/wallet');
const sequelize = require('../util/database');
const getLeaderBoard = async (req, res) => {
    try {
        const users = User.findAll();
        const wallet = Wallet.findAll();
        const userAggregateExpenses = {}
        wallet.forEach((expense) => {
            if (userAggregateExpenses[expense.userId]) {
                userAggregateExpenses[expense.userId] += expense.amount;
            }
            else {
                userAggregateExpenses[expense.userId] = expense.amount;
            }
            res.status(200).json(userAggregateExpenses)
        })
    } catch (err) {
        res.status(500).json(err);
    }

}
module.exports = {
    getLeaderBoard
}