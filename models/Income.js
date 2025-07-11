const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  total_income: {
    type: Number,
    required: true,
  },
  remaining_income: {
    type: Number,
    required: true,
  },
  month: {
    type: String, // format: "YYYY-MM" (e.g., "2025-06")
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
});

const Income = mongoose.model('Income', incomeSchema);
module.exports = Income;
