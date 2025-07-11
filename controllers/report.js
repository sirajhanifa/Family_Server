const Expense = require('../models/Expense');
const Income = require('../models/Income')

const ExpenseReport = async (req, res) => {
    const { username, date } = req.body; // date should be '2025-06'

    try {
        // Find income for the user and the specific month
        const IncomeData = await Income.findOne({ username, month: date });
        if (!IncomeData) {
            return res.status(404).json({ error: 'No income data found for this user and month' });
        }
        const expenseAmount = IncomeData.total_income - IncomeData.remaining_income;
        res.status(200).json({
            total_income: IncomeData.total_income,
            remaining_income: IncomeData.remaining_income,
            expense: expenseAmount,
            month: IncomeData.month
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
};


module.exports = { ExpenseReport };