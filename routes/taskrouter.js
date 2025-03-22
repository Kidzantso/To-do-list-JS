const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskscontroller.js');

router.get('/', taskController.getTasks);
router.post('/add-task', taskController.addTask);
router.get('/complete-task/:id', taskController.completeTask);
router.get('/delete-task/:id', taskController.deleteTask);
router.get('/edit-task/:id', taskController.renderEditPage);
router.post('/update-task/:id', taskController.updateTask);
router.get("/get-tasks", taskController.getAllTasks);
router.get('/cancel-completion/:id', taskController.cancelCompletion);

module.exports = router;
