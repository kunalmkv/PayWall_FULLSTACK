const user = require('../models/user');
function stringInvalid(str) {
    if (str == undefined || str.length == 0 || str == null)
        return true;
    else return false;
}
exports.login = async (req, res, next) => {
    try {

        const mail = req.body.mail;
        const password = req.body.pw;
        if (stringInvalid(password) || stringInvalid(mail)) {
            return res.status(400).json({ err: "Missing input parameters" })
        }

        res.status(201).json({ newUserDetail: data });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Oopss! User exists Already!! Login'
        })
    }
}
