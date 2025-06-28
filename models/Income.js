const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true  // Each user has one income record
    },
    total_income: {
        type: Number,
        required: false  // Optional at creation
    },
    remaining_income: {
        type: Number,
        required: false  // Optional at creation
    },
    created_at: {
        type: Date,
        default: Date.now  // Automatically sets the timestamp
    }
});

const Income = mongoose.model('Income', incomeSchema);
module.exports = Income;
