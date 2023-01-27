const express = require('express');
const passwordController = require('../controllers/forgotPassword');
const router = express.Router();
router.post('/forgotpassword', passwordController.forgotPassword);
module.exports = router;