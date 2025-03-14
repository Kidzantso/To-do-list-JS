const fs = require('fs');

class Task {
    constructor(ID, name, description) {
        this.ID = ID;
        this.name = name;
        this.description = description;
        this.dateEntered = new Date();
        this.dateCompleted = null;
        this.status = 0;
    }

    static getAllTasks() {
        try {
            const data = fs.readFileSync('tasks.json', 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return []; // Return an empty array if file doesn't exist
        }
    }

    saveTask() {
        let tasks = Task.getAllTasks();
        tasks.push(this);
        fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
    }

    static markTaskCompleted(id) {
        let tasks = Task.getAllTasks();
        let task = tasks.find(t => t.ID === id);
        if (task) {
            task.dateCompleted = new Date();
            task.status = 1;
            fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
        }
    }
}

module.exports = Task;
