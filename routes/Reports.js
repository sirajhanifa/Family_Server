const express = require('express');
const { ExpenseReport } = require('../controllers/report');
const router = express.Router();

router.post('/reports', ExpenseReport)


module.exports = router;
