// controllers/expenseController.js
const Expense = require('../models/Expense');
const Income = require('../models/Income');

const getCurrentMonth = () => new Date().toISOString().slice(0, 7); // "YYYY-MM"

const NewExpense = async (req, res) => {
    try {
        const { username, amount, category, date, expense } = req.body;
        const amountNum = Number(amount);

        if (isNaN(amountNum)) {
            return res.status(400).json({ error: 'Amount must be a number' });
        }

        const expenseItem = {
            amount: amountNum,
            category,
            description: expense,
            date,
        };

        await Expense.findOneAndUpdate(
            { username },
            { $push: { expenses: expenseItem } },
            { new: true, upsert: true }
        );

        const currentMonth = getCurrentMonth();
        const income = await Income.findOne({ username });

        if (!income) {
            return res.status(404).json({ error: 'Income record not found' });
        }

        if (income.month !== currentMonth) {
            // Reset income for new month
            income.month = currentMonth;
            income.remaining_income = income.total_income - amountNum;
        } else {
            income.remaining_income -= amountNum;
        }

        await income.save();

        res.status(201).json({
            message: 'Expense added successfully',
            expense: expenseItem,
            remaining_income: income.remaining_income
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
        const currentMonth = getCurrentMonth();

        const income = await Income.findOneAndUpdate(
            { username },
            {
                total_income: totalIncome,
                remaining_income: totalIncome,
                month: currentMonth
            },
            { new: true, upsert: true }
        );

        res.status(200).json({ message: 'Income set successfully', income });
    } catch (error) {
        console.error('Error setting income:', error);
        res.status(500).json({ error: 'Failed to set income' });
    }
};

const getExpenses = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await Expense.findOne({ username });
        if (user && user.expenses) {
            const currentMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"
            // Filter expenses for the current month
            const filteredExpenses = user.expenses.filter(exp =>
                exp.date && exp.date.toISOString().slice(0, 7) === currentMonth
            );
            res.json(filteredExpenses);
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
        const currentMonth = getCurrentMonth();

        if (income.month !== currentMonth) {
            income.month = currentMonth;
            income.remaining_income = income.total_income;
            await income.save();
        }

        res.json({
            total_income: income.total_income,
            remaining_income: income.remaining_income
        });
    } else {
        res.json({ total_income: 0, remaining_income: 0 });
    }
};

module.exports = { NewExpense, setIncome, getIncome, getExpenses };
