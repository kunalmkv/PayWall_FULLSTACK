const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const user = require('./models/user');
const userWallet = require('./models/wallet');
const sequelize = require('./util/database');
var cors = require('cors');
const newUserRoutes = require('./routes/newUser');
const existingUserRoutes = require('./routes/existingUser');
const expenseRoutes = require('./routes/expense');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/newUser', newUserRoutes);
app.use('/existingUser', existingUserRoutes);
app.use('/expense', expenseRoutes);


user.hasMany(userWallet);
userWallet.belongsTo(user);
sequelize.sync().then(result => {
    app.listen(3000);
})
    .catch(err => {
        console.log(err);
    })
