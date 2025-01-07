const express = require('express');
const route = express.Router();
const Celebration = require('../models/ToDoList'); // Import your Mongoose model

// Route to Fetch All Celebrations
route.get('/celebrations', async (req, res) => {
    try {
        const celebrations = await Celebration.find(); // Fetch all celebrations
        res.status(200).json(celebrations); // Send the data to the frontend
    } catch (error) {
        console.error('Error fetching celebrations:', error);
        res.status(500).json({ message: 'Error fetching celebrations' });
    }
});

module.exports = route;
