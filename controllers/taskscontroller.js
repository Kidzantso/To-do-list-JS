const fs = require('fs');
const path = require('path');
const tasksFile = path.join(__dirname, '../tasks.json');
const Task = require('../models/Tasks.js'); // Adjust path based on your folder structure

// Function to get tasks
exports.getTasks = (req, res) => {
    let tasks = fs.existsSync(tasksFile) ? JSON.parse(fs.readFileSync(tasksFile, 'utf8')) : [];
    res.render('tasks', { tasks });
};

exports.getAllTasks = (req, res) => {
    if (fs.existsSync(tasksFile)) {
        const tasks = JSON.parse(fs.readFileSync(tasksFile, "utf8"));
        res.json(tasks); // Send JSON response
    } else {
        res.json([]); // Send empty array if file doesn't exist
    }
};
// Function to add a task
exports.addTask = (req, res) => {
    let tasks = fs.existsSync(tasksFile) ? JSON.parse(fs.readFileSync(tasksFile, 'utf8')) : [];

    const newTask = {
        ID: tasks.length + 1,
        name: req.body.name,
        description: req.body.description,
        priority: req.body.priority,
        category: req.body.category,
        dateentered: Date.now(),
        datecompleted: null,
        status: 0
    };

    tasks.push(newTask);
    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
    res.redirect('/');
};

// Function to mark a task as completed
exports.completeTask = (req, res) => {
    let tasks = JSON.parse(fs.readFileSync(tasksFile, 'utf8'));
    tasks.forEach(task => {
        if (task.ID == req.params.id) {
            task.datecompleted = Date.now();
            task.status = 1;
        }
    });
    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
    res.redirect('/');
};

// Function to delete a task
exports.deleteTask = (req, res) => {
    let tasks = JSON.parse(fs.readFileSync(tasksFile, 'utf8'));
    tasks = tasks.filter(task => task.ID != req.params.id);
    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
    res.redirect('/');
};
exports.cancelCompletion = (req, res) => {
    let tasks = JSON.parse(fs.readFileSync(tasksFile, 'utf8'));
    tasks.forEach(task => {
        if (task.ID == req.params.id) {
            task.datecompleted = null;
            task.status = 0;
        }
    });
    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
    res.redirect('/');
};
// Function to render the edit page
exports.renderEditPage = (req, res) => {
    let task = Task.getTaskById(req.params.id);
    if (task) {
        res.render('edit-task', { task });
    } else {
        res.redirect('/tasks'); // Redirect if task is not found
    }
};


// Function to update the task
exports.updateTask = (req, res) => {
    const { name, description, category, priority } = req.body;
    Task.updateTask(req.params.id, { name, description, category, priority });
    res.redirect('/');
};
