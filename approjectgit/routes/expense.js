const express = require('express');

const expenseController = require('../controllers/expense');

const router = express.Router();


router.post('/postexpense', expenseController.postexpense);

router.get('/getexpense', expenseController.getexpense);

router.delete('/deleteAddExpense/:ExpenseId', expenseController.deleteAddExpense);



module.exports = router;