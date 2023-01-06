const express = require('express');

const expenseController = require('../controllers/expense');

const userauthentication=require('../middleware/auth')

const router = express.Router();


router.post('/postexpense',userauthentication.authenticate, expenseController.postexpense);

router.get('/getexpense',userauthentication.authenticate ,expenseController.getexpense);
router.delete('/deleteAddExpense/:ExpenseId',userauthentication.authenticate, expenseController.deleteAddExpense);



module.exports = router;