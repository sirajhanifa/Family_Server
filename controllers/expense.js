const Expense = require('../models/Expense');
const Income = require('../models/Income')


const NewExpense = async (req, res) => {
    try {
        const { username, amount, category, date, expense } = req.body;

        // Make sure amount is a number
        const amountNum = Number(amount);
        if (isNaN(amountNum)) {
            return res.status(400).json({ error: 'Amount must be a number' });
        }

        // Build the new expense item
        const expenseItem = {
            amount: amountNum,
            category,
            description: expense,
            date,
        };

        // Add the expense to the user's expenses array, or create a new document if not exists
        await Expense.findOneAndUpdate(
            { username },
            { $push: { expenses: expenseItem } },
            { new: true, upsert: true }
        );

        // Reduce remaining income
        const updatedIncome = await Income.findOneAndUpdate(
            { username },
            { $inc: { remaining_income: -amountNum } }, // Use the number version
            { new: true }
        );          

        if (!updatedIncome) {
            return res.status(404).json({ error: 'Income record not found for this user' });
        }

        res.status(201).json({
            message: 'Expense added successfully',
            expense: expenseItem,
            remaining_income: updatedIncome.remaining_income
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to add expense' });
    }
};
const setIncome = async (req, res) => {
    const { username, totalIncome } = req.body;

    if (!username || totalIncome == null) {
        return res.status(400).json({ error: 'Username and totalIncome are required' });
    }

    try {
        const income = await Income.findOneAndUpdate(
            { username }, // match by username
            {
                total_income: totalIncome,
                remaining_income: totalIncome, // reset remaining income to full
            },
            { new: true, upsert: true } // new = return updated, upsert = create if not exist
        );

        res.status(200).json({ message: 'Income set successfully', income });
    } catch (error) {
        console.error('Error setting income:', error);
        res.status(500).json({ error: 'Failed to set income' });
    }
}

// GET /api/expenses/:username
const getExpenses = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await Expense.findOne({ username });
        if (user && user.expenses) {
            res.json(user.expenses);
        } else {
            res.json([]);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch expenses' });
    }
};

const getIncome = async (req, res) => {
    const { username } = req.params;
    const income = await Income.findOne({ username });
    if (income) {
        res.json({
            total_income: income.total_income,
            remaining_income: income.remaining_income
        });
    } else {
        res.json({ total_income: 0, remaining_income: 0 });
    }
}
module.exports = { NewExpense, setIncome, getIncome, getExpenses };