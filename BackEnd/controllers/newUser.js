const user = require('../models/user');
function stringInvalid(str) {
    if (str == undefined || str.length == 0 || str == null)
        return true;
    else return false;
}
exports.postAddUser = async (req, res, next) => {
    try {
        const userID = req.body.newID;
        const mail = req.body.mail;
        const password = req.body.pw;
        if (stringInvalid(userID) || stringInvalid(password) || stringInvalid(mail)) {
            return res.status(400).json({ err: "Missing input parameters" })
        }
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
            error: 'Oopss! User exists Already!! Login'
        })
    }
}
