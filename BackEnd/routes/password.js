const express = require('express');
const passwordController = require('../controllers/Password');

const router = express.Router();

router.post('/forgotpassword', passwordController.forgotPassword);
router.get('/reset-password', passwordController.resetPassword);



module.exports = router;