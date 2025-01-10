const express = require('express');
const route = express.Router();
const todos = require('../models/ToDoList');


//fetch all routine
route.post('/routine', async (req, res) => {
    const { username } = req.body;
    try {
        const response = await todos.findOne({ username })
        const routine = response.routine;
        res.json(routine);



    }
    catch (error) {
        console.log(error);

    }

})

module.exports = route;