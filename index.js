const express = require('express');
const app = express();


const connectDB = require('./config/db'); // Import the database connection

//Models
const user = require('./models/User')
const todo = require('./models/ToDoList')

//Routes
const login = require('./routes/Login')
const todolist = require('./routes/Todo')
const celebration = require('./routes/Celebrations')
const dailyroutine = require('./routes/DailyRoutine')
const expense = require('./routes/Expense')

require('dotenv').config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
const cors = require('cors');
app.use(cors());


//Set the routing

app.use('/api', login)
app.use('/api', todolist)
app.use('/api', celebration)
app.use('/api', dailyroutine)
app.use('/api', expense)

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on the http://localhost:${PORT}`);
});
