const express = require('express');
const app = express();


const connectDB = require('./db'); // Import the database connection

//Models
const user = require('./models/User')
const todo = require('./models/ToDoList')

//Routes
const login = require('./routes/Login')
const todolist = require('./routes/Todo')
const celebration = require('./routes/Celebrations')

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

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
