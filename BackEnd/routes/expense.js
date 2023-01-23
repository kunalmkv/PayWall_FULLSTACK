const path = require('path');

const express = require('express');

const expenseController = require('../controllers/expense');

const router = express.Router();

router.post('/add-expense', expenseController.postAddExp);
router.get('/get-expense', expenseController.getExpense);
router.delete('/delete-expense/:id', expenseController.deleteExpense);
router.put('/edit-expense/:id', expenseController.editExpense);
module.exports = router;