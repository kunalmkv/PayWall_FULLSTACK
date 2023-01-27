const forgot = require('../models/forgotpassword');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const config = require('../config/config');
const sendResetPasswordMail = async (name, email, token) => {
    try {
        const transport = nodemailer.createTestAccount({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: config.emailUser,
                pass: config.emailPassword
            }
        });
        const mailOptions = {
            from: config.emailUser,
            to: email,
            subject: 'Reset Password',
            html: `<p> Hiii ${name}, Please copy the link and<a href="http://127.0.0.1:3000/reset-password?token=${token}">  reset pssword </a>`
        }
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('mail has been sent', info.response)
            }
        })

    } catch (error) {
        //return res.status(400).send({ success: false, message: error.message })
        return error;
    }
}
const forgotPassword = async (req, res, next) => {
    const email = req.body.mail;

    try {
        const userData = await User.findOne({ where: { email: email } });

        if (userData) {
            const randomString = randomstring.generate();
            const data = await forgot.create({ email: email, token: randomString });

            sendResetPasswordMail(userData.userName, userData.email, randomString);
            return res.status(200).send({ success: true, message: 'Please check your inbox and follow link to reset' });

        }
        else {
            return res.status(200).json({ success: true, message: 'email not found' });
        }

    }
    catch (error) {
        res.status(400).json({ success: false, message: 'failed' })
    }

}

module.exports = {
    forgotPassword
}
