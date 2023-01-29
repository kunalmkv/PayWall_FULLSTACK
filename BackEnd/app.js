const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const user = require('./models/user');
const userWallet = require('./models/wallet');
const Order = require('./models/orders');
const sequelize = require('./util/database');
const purchaseRoutes = require('./routes/purchase');
const premiumRoute = require('./routes/premium');


// get config vars
dotenv.config();


var cors = require('cors');

const newUserRoutes = require('./routes/newUser');
const existingUserRoutes = require('./routes/existingUser');
const expenseRoutes = require('./routes/expense');
const passwordRoutes = require('./routes/password');




const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/premium', premiumRoute);
app.use('/newUser', newUserRoutes);
app.use('/existingUser', existingUserRoutes);
app.use('/expense', expenseRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/password', passwordRoutes);
app.use('/user', expenseRoutes);



user.hasMany(userWallet);
userWallet.belongsTo(user);

user.hasMany(Order);
Order.belongsTo(user);
sequelize.sync().then(result => {
    app.listen(3000);
})
    .catch(err => {
        console.log(err);
    })
