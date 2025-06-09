const mongoose = require('mongoose');

// Define To-Do Schema
const todoSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Unique key for each user

    tasks: [
        {
            task: { type: String, required: true },
            deadline: { type: Date, required: true },
        },
    ],

    routine: [
        {
            task: { type: String, required: true },
            time: { type: String, required: true },
        },
    ],

    celebrations: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
            eventDate: { type: Date, required: true },
            description: { type: String, required: true },
        },
    ],

    expenses: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
            name: { type: String, required: true },
            amount: { type: Number, required: true },
            category: { type: String, required: true },
            date: { type: Date, default: Date.now }
        }
    ]
});

// Create the To-Do model
const ToDo = mongoose.model('ToDo', todoSchema);

module.exports = ToDo;
