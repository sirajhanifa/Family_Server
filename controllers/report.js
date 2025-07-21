const expense = require('../models/Expense');

const getReport = async (req, res) => {
    try {
        const { username, date } = req.body; // date format: "2025-06"

        if (!username || !date) {
            return res.status(400).json({ success: false, message: 'Username and date are required' });
        }

        // Parse input date to get month & year
        const [year, month] = date.split('-');

        const user = await expense.findOne({ username });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Filter expenses by month/year
        const filteredExpenses = user.expenses.filter(exp => {
            const expDate = new Date(exp.date);
            return (
                expDate.getFullYear() === parseInt(year) &&
                expDate.getMonth() + 1 === parseInt(month) // +1 because getMonth is 0-based
            );
        });

        res.json({ success: true, data: filteredExpenses });

    } catch (error) {
        console.error('Report generation error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { getReport };