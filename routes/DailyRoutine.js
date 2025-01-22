const express = require('express');
const route = express.Router();
const todos = require('../models/ToDoList');


//fetch all routine
route.post('/routine', async (req, res) => {
    const { username } = req.body;
    try {
        const response = await todos.findOne({ username },
            { routine: 1, _id: 0 });
        res.json(response.routine);



    }
    catch (error) {
        console.log(error);

    }

})

//Add new routine

route.post('/newroutine', async (req, res) => {
    const { username, task, time } = req.body;
    try {
        const response = await todos.findOne({ username });
        response.routine.push({ task, time });
        await response.save();
        res.json(response.routine);
    }
    catch (error) {
        console.log(error);
    }


})

// Delete a specific routine task for a user
route.delete('/finishRoutine', async (req, res) => {
    const { username, task } = req.body;
    try {
        const user = await todos.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Filter out the task from the routine
        const updatedRoutine = user.routine.filter(routine => routine.task !== task);
        if (updatedRoutine.length === user.routine.length) {
            return res.status(404).json({ message: 'Routine task not found' });
        }

        user.routine = updatedRoutine;
        await user.save();
        res.status(200).json({ message: 'Routine task deleted successfully', routine: user.routine });
    } catch (error) {
        console.error('Error deleting routine task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
module.exports = route;