const jwt = require('jsonwebtoken');
const user = require('../models/user');

const authenticate = (req, res, next) => {
    try {
        const token = req.Header('Authorization');
        console.log(token);
        const userObj = jwt.verify(token, '9868314748');
        console.log('user ID >>>>>>>>', userObj.userId)
        user.findByPk(userObj.userId).then(userOBJECT => {

            console.log(JSON.stringify(user));
            req.userOBJECT = userOBJECT;
            next();
        })
    } catch (err) {
        console.log(err);
        return res.status(401).json({ success: false })
    }
}
module.exports = {
    authenticate
}