const mongoose = require('mongoose');

const expenseItemSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
});

const expenseSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  expenses: [expenseItemSchema], // 👈 Add all expenses here
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
