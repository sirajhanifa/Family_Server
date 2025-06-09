const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  username: { type: String, required: true }, // added field to identify the user
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense', expenseSchema);
