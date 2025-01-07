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
    routine: [
        {
            task: { type: String, required: true }, // Routine task field
            time: { type: String, required: true }, // Time field for the daily routine
        },
    ],
    celebrations: [
        {
            eventDate: { type: Date, required: true }, // Date of the celebration
            description: { type: String, required: true }, // Description of the event
        },
    ],
});

// Create the To-Do model
const ToDo = mongoose.model('ToDo', todoSchema);

module.exports = ToDo;
