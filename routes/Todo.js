const express = require('express')
const routes = express.Router();
const todo = require('../models/ToDoList');

//fetch todolist

routes.post('/todolist', async (req, res) => {
    const { username } = req.body;

    try {
        const usertodo = await todo.findOne({ username: username }); 
        if (usertodo) {
            const userTasks = usertodo.tasks.map(task => ({
                task: task.task,
                deadline: task.deadline,
            })); 

            res.json(userTasks); // Send the tasks and deadlines to the frontend
        } else {
            res.status(404).json({ message: 'User not found' }); 
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' }); 
    }
});


// Add a new task to the user's task list
routes.post('/newtask', async (req, res) => {
    const { username, task, deadline } = req.body; // Include deadline in the request body

    if (!task || !deadline) {
        return res.status(400).json({ message: 'Task and deadline are required' });
    }

    try {
        const usertodo = await todo.findOne({ username: username });
        if (usertodo) {
            // Add the new task with deadline to the tasks array
            usertodo.tasks.push({ task, deadline });
            await usertodo.save();
            res.status(200).json(usertodo.tasks); // Send the updated tasks array
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Finish (delete) a task
routes.delete('/finish', async (req, res) => {
    const { username, task } = req.body;

    try {
        const usertodo = await todo.findOne({ username: username });
        if (usertodo) {
            // Remove the task from the tasks array
            usertodo.tasks = usertodo.tasks.filter((t) => t.task !== task);
            await usertodo.save();
            res.status(200).json(usertodo.tasks); // Send the updated tasks array
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = routes;