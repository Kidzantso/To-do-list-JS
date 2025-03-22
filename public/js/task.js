document.addEventListener("DOMContentLoaded", () => {
    const categoryFilter = document.getElementById("categoryFilter");
    const priorityFilter = document.getElementById("priorityFilter");
    const tasks = document.querySelectorAll(".task-item");

    categoryFilter.addEventListener("change", filterTasks);
    priorityFilter.addEventListener("change", filterTasks);

    function filterTasks() {
        let selectedCategory = categoryFilter.value;
        let selectedPriority = priorityFilter.value;

        tasks.forEach(task => {
            let taskCategory = task.dataset.category;
            let taskPriority = task.dataset.priority;

            let matchesCategory = (selectedCategory === "All" || taskCategory === selectedCategory);
            let matchesPriority = (selectedPriority === "All" || taskPriority === selectedPriority);

            task.style.display = (matchesCategory && matchesPriority) ? "flex" : "none";
        });
    }
});
