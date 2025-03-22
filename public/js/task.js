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
document.addEventListener("DOMContentLoaded", function () {
    fetchTasksAndUpdateProgress();
});

function fetchTasksAndUpdateProgress() {
    fetch('/get-tasks') // Ensure this route returns JSON
        .then(response => response.json())
        .then(tasks => {
            console.log("Fetched tasks:", tasks); // Debugging log

            const total = tasks.length;
            const completed = tasks.filter(task => task.status === 1).length;

            console.log(`Total: ${total}, Completed: ${completed}`); // Debugging log

            // Update the task count display
            document.getElementById("completed-count").textContent = completed;
            document.getElementById("total-count").textContent = total;

            // Calculate and update progress bar width
            let progress = total > 0 ? (completed / total) * 100 : 0;
            document.getElementById("progress-fill").style.width = progress + "%";
        })
        .catch(error => console.error("Error fetching tasks:", error));
}
document.addEventListener("DOMContentLoaded", function () {
    const progressBar = document.getElementById("progress");
    const progressText = document.getElementById("progress-text");

    if (progressBar) {
        let progressValue = parseInt(progressText.innerText, 10);

        // Function to determine the color based on percentage
        function getProgressColor(value) {
            if (value === 100) return "green";         // Completed
            if (value >= 75) return "lightgreen";      // Almost done
            if (value >= 50) return "yellow";         // Halfway there
            if (value >= 25) return "orange";         // Getting started
            return "red";                             // Not much progress
        }

        // Apply the color dynamically
        progressBar.style.backgroundColor = getProgressColor(progressValue);
    }
});
