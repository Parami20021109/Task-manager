const express = require('express');
const router = express.Router();

// Import the Controller functions
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../controller/taskController');

// Define the Routes
// Grouping by path: '/' refers to the base /api/tasks
router.route('/')
  .get(getTasks)    // GET all tasks
  .post(createTask); // POST a new task

// Grouping routes that require an ID
router.route('/:id')
  .patch(updateTask) // UPDATE a specific task
  .delete(deleteTask); // DELETE a specific task

module.exports = router;