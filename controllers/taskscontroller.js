const fs = require('fs');
const path = require('path');
const tasksFile = path.join(__dirname, '../tasks.json');

// Function to get tasks
exports.getTasks = (req, res) => {
    let tasks = [];
    if (fs.existsSync(tasksFile)) {
        tasks = JSON.parse(fs.readFileSync(tasksFile, 'utf8'));
    }
    res.render('tasks', { tasks });
};

// Function to add a task
exports.addTask = (req, res) => {
    let tasks = [];
    if (fs.existsSync(tasksFile)) {
        tasks = JSON.parse(fs.readFileSync(tasksFile, 'utf8'));
    }

    const newTask = {
        ID: tasks.length + 1,
        name: req.body.name,
        description: req.body.description,
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
    tasks = tasks.map(task => {
        if (task.ID == req.params.id) {
            task.datecompleted = Date.now();
            task.status = 1;
        }
        return task;
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
