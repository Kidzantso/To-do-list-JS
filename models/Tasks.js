const fs = require('fs');

class Task {
    constructor(ID, name, description, priority, category) {
        this.ID = ID;
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.category = category;
        this.dateEntered = new Date();
        this.dateCompleted = null;
        this.status = 0;
    }

    static getAllTasks() {
        try {
            const data = fs.readFileSync('tasks.json', 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
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
    static updateTask(id, newData) {
        let tasks = Task.getAllTasks();
        let task = tasks.find(t => t.ID === parseInt(id));
        if (task) {
            task.name = newData.name || task.name;
            task.description = newData.description || task.description;
            task.category = newData.category || task.category;
            task.priority = newData.priority || task.priority;
            fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
        }
    }
    static getTaskById(id) {
        const tasks = this.getAllTasks();
        return tasks.find(task => task.ID == id);
    }
}

module.exports = Task;
