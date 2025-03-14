const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskscontroller.js');

router.get('/', taskController.getTasks);
router.post('/add-task', taskController.addTask);
router.get('/complete-task/:id', taskController.completeTask);
router.get('/delete-task/:id', taskController.deleteTask);

module.exports = router;
