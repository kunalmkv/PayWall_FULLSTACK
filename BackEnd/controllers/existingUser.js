const user = require('../models/user');
const bcrypt = require('bcrypt');
function stringInvalid(str) {
    if (str == undefined || str.length == 0 || str == null)
        return true;
    else return false;
}
/*exports.login = async (req, res, next) => {
    try {

        const mail = req.body.mail;
        const password = req.body.pw;
        if (stringInvalid(password) || stringInvalid(mail)) {
            return res.status(400).json({ err: "Missing input parameters" })
        }
        const findUser = await user.findOne({ where: { email: mail } })
            .then(user => {
                if (user) {
                    if (findUser.password == password) {
                        return res.status(201).send('Login Succesfull');
                    }
                    else {
                        return res.status(400).send('Login Unsuccesfull since wrong Password');
                    }

                } else {
                    return res.status(500).send('User Not found');
                }
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Oopss!Searching not succeed!'
        })
    }
}*/
exports.login = async (req, res, next) => {
    try {

        const mail = req.body.mail;
        const password = req.body.pw;
        if (stringInvalid(password) || stringInvalid(mail)) {
            return res.status(400).json({ success: false, err: "Missing input parameters" });
        }
        user.findAll({ where: { email: mail } }).then(user => {
            if (user.length > 0) {
                bcrypt.compare(password, user[0].password, function (err, response) {
                    if (err) {
                        return res.json({ success: false, message: 'something went wrong' });
                    }
                    if (response) {

                        return res.status(200).json({ success: true, message: 'Successfully Logged IN' })
                    }
                    else {
                        return res.status(401).json({ success: false, message: 'password incorrect' })
                    }
                })

            }
            else {
                return res.status(401).json({ success: false, message: 'password do not match' });
            }

        })
    } catch (err) {
        res.status(500).json({ message: err, success: false })
    }
}

