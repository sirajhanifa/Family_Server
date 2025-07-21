const express = require('express');
const User = require('../models/User'); // User model
const Todo = require('../models/ToDoList'); // Todo model
const Expense = require('../models/Expense')
const income = require('../models/Income')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Income = require('../models/Income');
const axios = require('axios');

const route = express.Router();
const secretKey = "abcdef"; // Replace with a more secure key in production

// Login
route.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // Compare provided password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});

// Create a new user
route.post('/newUser', async (req, res) => {
  const { username, password, phone } = req.body;
  const currentMonth = new Date().getMonth() + 1;

  if (!username || !password || !phone) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const newUser = new User({ username, password: hashedPassword, phone });
    await newUser.save();

    // Create and save related documents
    await new Todo({ username }).save();
    await new Expense({ username }).save();
    await new Income({
      username,
      total_income: 0,
      remaining_income: 0,
      month: currentMonth
    }).save();

    res.status(201).json({ message: 'User created successfully.' });

  } catch (error) {
    console.error('Signup Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = route;
