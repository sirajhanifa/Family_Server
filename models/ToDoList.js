const mongoose = require('mongoose');

// Define To-Do Schema
const todoSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Unique key for each user
    tasks: [
        {
            task: { type: String, required: true }, // Task field
            deadline: { type: Date, required: true }, // Deadline field
        },
    ],
});

// Create the To-Do model
const ToDo = mongoose.model('ToDo', todoSchema);

module.exports = ToDo;
