const path = require('path');

const express = require('express');

const newUserController = require('../controllers/userLogin');

const router = express.Router();
router.post('/login', newUserController.login);

module.exports = router;