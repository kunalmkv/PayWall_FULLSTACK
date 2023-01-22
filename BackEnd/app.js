const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
var cors = require('cors');
const newUserRoutes = require('./routes/newUser');
const existingUserRoutes = require('./routes/existingUser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/newUser', newUserRoutes);
app.use('/existingUser', existingUserRoutes);

sequelize.sync().then(result => {
    app.listen(3000);
})
    .catch(err => {
        console.log(err);
    })
