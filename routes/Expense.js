const express = require('express');
const router = express.Router();
const ToDo = require('../models/ToDoList'); // Only this is needed now

// ✅ GET /api/expenses/:username - fetch expenses for a user
router.get('/fetchexpenses/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const userDoc = await ToDo.findOne({ username });
    if (!userDoc) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(userDoc.expenses || []);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ message: 'Server error fetching expenses' });
  }
});

// ✅ POST /api/expenses/:username - add expense for a user
router.post('/expenses/:username', async (req, res) => {
  const { username } = req.params;
  const { name, amount, category, date } = req.body;

  try {
    const userDoc = await ToDo.findOne({ username });

    if (!userDoc) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newExpense = {
      name,
      amount,
      category,
      date: date || new Date()
    };

    userDoc.expenses.push(newExpense);
    await userDoc.save();

    res.status(201).json({ message: 'Expense added', data: newExpense });
  } catch (err) {
    console.error('Error adding expense:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;
