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
}
