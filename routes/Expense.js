const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense')


// GET /api/expenses - fetch all expenses
router.get('/fetchexpenses', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 }); // newest first    
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ message: 'Server error fetching expenses' });
  }
});


// POST /api/expenses
router.post('/expenses', async (req, res) => {
  const { name, amount, category, date } = req.body;
  try {
    const newExpense = new Expense({ name, amount, category, date });
    await newExpense.save();
    res.status(201).json({ message: 'Expense created', data: newExpense });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;