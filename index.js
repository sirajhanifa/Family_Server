const express = require('express');
const app = express();
require('dotenv').config();

const connectDB = require('./config/db'); // Import the database connection

// Models
require('./models/User');
require('./models/ToDoList');
require('./models/Expense');
require('./models/Income');

// Routes
const login = require('./routes/Login');
const celebration = require('./routes/Celebrations');
const dailyroutine = require('./routes/DailyRoutine');
const Expense = require('./routes/Expense');
const Reports = require('./routes/Reports');
const Settings = require('./routes/Settings');

const cors = require('cors');

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files for uploaded images
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set the routing
app.use('/api', login);
app.use('/api', celebration);
app.use('/api', dailyroutine);
app.use('/api', Expense);
app.use('/api', Reports);
app.use('/api', Settings);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on the http://localhost:${PORT}`);
});