const mongoose = require('mongoose');

// Define To-Do Schema
const todoSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Unique key for each user
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

    
});

// Create the To-Do model
const ToDo = mongoose.model('ToDo', todoSchema);

module.exports = ToDo;
