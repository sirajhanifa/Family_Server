const express = require('express');
const router = express.Router();
const {NewExpense, setIncome, getIncome, getExpenses} = require('../controllers/expense')


router.post('/newExpense', NewExpense)
router.post('/setIncome', setIncome)
router.get('/getIncome/:username', getIncome)
router.get('/expenses/:username', getExpenses);


module.exports = router;