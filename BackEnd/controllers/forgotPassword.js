const forgotPassword = async (req, res, next) => {
    console.log(req.body.mail);
    return res.status(202).json({ success: true, message: 'details submitted' });
}

module.exports = {
    forgotPassword
}