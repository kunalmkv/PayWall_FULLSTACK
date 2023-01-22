const user = require('../models/user');
exports.postAddUser = async (req, res, next) => {
    try {
        const userID = req.body.newID;
        const mail = req.body.mail;
        const password = req.body.pw;
        const data = await user.create({
            userName: userID,
            email: mail,
            password: password
        })
        console.log("*****new user added********", data);
        res.status(201).json({ newUserDetail: data });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
}
