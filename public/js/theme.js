document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    const container = document.querySelector(".container"); 
    const taskItems = document.querySelectorAll(".task-item");

    // Function to apply theme
    function applyTheme(theme) {
        if (theme === "dark") {
            body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "☀️ Light Mode";

            // Apply dark mode styles to specific elements
            if (container) container.style.background = "rgba(34, 34, 34, 0.9)";
            taskItems.forEach(item => item.style.background = "rgba(50, 50, 50, 0.8)");
        } else {
            body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
            themeToggle.textContent = "🌙 Dark Mode";

            // Apply light mode styles to specific elements
            if (container) container.style.background = "rgba(255, 255, 255, 0.9)";
            taskItems.forEach(item => item.style.background = "rgba(255, 255, 255, 0.8)");
        }
    }

    // Load stored theme on page load
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);

    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = body.classList.contains("dark-mode") ? "light" : "dark";
            applyTheme(currentTheme);
        });
    }
});
