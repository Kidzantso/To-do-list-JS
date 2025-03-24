const express = require("express");
const router = express.Router();
const taskController = require('../controllers/taskscontroller.js');

router.get("/", (req, res) => {
    res.render("add");
});
router.post('/add-task', taskController.addTask);
module.exports = router;
