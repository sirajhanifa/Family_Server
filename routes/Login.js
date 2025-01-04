const express = require('express');
const User = require('../models/User'); // Ensure the User model is properly set up and imported
const Todo = require('../models/ToDoList')

const route = express.Router();

route.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // Compare plain text passwords
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // If credentials are correct, send a success response
    res.status(200).json({
      message: 'Login successful!',
      user: {
        id: user._id,
        username: user.username,
        // Include any other user details, except sensitive ones like the password
      },
    });
  } catch (error) {
    // Log the error for debugging
    console.error('Login error:', error);

    // Send a generic server error message
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});
//---------------------------------------------------------

// POST route to create a new user
route.post('/newUser', async (req, res) => {
  const { username, password } = req.body;

  try {
      // Validate input
      if (!username || !password) {
          return res.status(400).json({ error: "Username and password are required" });
      }

      // Create and save the new user
      const newUser = new User({ username: username, password: password });
      const newUserTodo = new Todo ({ username: username });
      const savedUser = await newUser.save();
      const savedUserTodo = await newUserTodo.save();

      // Respond with success
      res.status(201).json({
          message: "User created successfully",
          user: savedUser
      });
  } catch (error) {
      console.error("Error saving user:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = route;
