const express = require('express');
const purchaseController = require('../controller/purchase');
const authenticateMiddleware = require('../middleware/auth');

const router = express.Router;
router.get('/premiummembership', authenticateMiddleware.authenticate, purchaseController.purchasePremium);
router.post('/updatetransactionstatus', authenticatemiddleware.authenticate, purchaseController.updateTransactionStatus)

module.exports = router;