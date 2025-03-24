document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("task-form");
    const successMessage = document.getElementById("success-message");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent page reload

        // Collect form data
        const formData = new FormData(form);

        // Send AJAX request
        fetch("/add/add-task", {
            method: "POST",
            body: new URLSearchParams(formData), // Convert formData to URL encoded format
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("Server Response:", data); // Debugging
            if (data.success) {
                successMessage.textContent = data.message;
                successMessage.style.display = "block"; // Make it visible
                successMessage.style.color = "green"; // Ensure text is readable

                // Clear form fields
                form.reset();

                // Reset select elements to default
                document.getElementById("task-priority").selectedIndex = 0;
                document.getElementById("task-category").selectedIndex = 0;

                // Hide message after 3 seconds
                setTimeout(() => {
                    successMessage.style.display = "none";
                }, 3000);
            } else {
                console.error("Error: Task was not added properly.");
            }
        })
        .catch(error => console.error("Error adding task:", error));
    });
});
