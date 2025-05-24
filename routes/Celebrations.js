const express = require('express');
const route = express.Router();
const todos = require('../models/ToDoList'); // Import your Mongoose model

// Route to Fetch All Celebrations
route.post('/celebrations', async (req, res) => {
    const {username} = req.body;    
    try {
        const response = await todos.findOne({username}); // Fetch all celebrations   
        const  Celebration= response.celebrations; // Extract the celebrations array from the document                     
        res.status(200).json(Celebration); // Send the data to the frontend
    } catch (error) {
        console.error('Error fetching celebrations:', error);
        res.status(500).json({ message: 'Error fetching celebrations' });
    }
});

// Route to Add a New Celebration

route.post('/newcelebration', async (req, res) => {
    const {username, eventDate, description} = req.body;
    try {
        const response = await todos.findOne({username}); // Fetch the document that matches the username
        response.celebrations.push({eventDate, description}); // Add the new celebration to the celebrations array
        await response.save(); // Save the updated document back to the database
        res.status(200).json(response.celebrations); // Send the updated celebrations array back to the frontend

    }
    catch(error)
    {
        console.log(error);
        
    }
    
})

//Edit Celebration and eventDate

// route.put('/editcelebration')

module.exports = route;
