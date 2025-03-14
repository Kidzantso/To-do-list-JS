document.addEventListener("DOMContentLoaded", () => {
    let focusTime = 25 * 60; // 25 minutes
    let breakTime = 5 * 60;  // 5 minutes
    let timerDisplay = document.getElementById("timer-display");
    let breakDisplay = document.getElementById("break-timer-display");
    let breakMessage = document.getElementById("break-message");
    let startBtn = document.getElementById("start-btn");
    let pauseBtn = document.getElementById("pause-btn");
    let resetBtn = document.getElementById("reset-btn");
    let skipBreakBtn = document.getElementById("skip-break-btn");

    let timer, breakTimer;
    let isPaused = false;

    function startFocusTimer() {
        startBtn.style.display = "none";
        pauseBtn.classList.remove("hidden");
        resetBtn.classList.remove("hidden");

        timer = setInterval(() => {
            if (!isPaused) {
                let minutes = Math.floor(focusTime / 60);
                let seconds = focusTime % 60;
                timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
                focusTime--;

                if (focusTime < 0) {
                    clearInterval(timer);
                    showBreakMessage(); 
                }
            }
        }, 1000);
    }

    function showBreakMessage() {
        console.log("Break message should appear now"); 
        breakMessage.classList.remove("hidden"); 
        breakMessage.style.display = "block"; 
        startBreakTimer();
    }

    function startBreakTimer() {
        let breakTimeLeft = breakTime;
        breakTimer = setInterval(() => {
            let minutes = Math.floor(breakTimeLeft / 60);
            let seconds = breakTimeLeft % 60;
            breakDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
            breakTimeLeft--;

            if (breakTimeLeft < 0) {
                clearInterval(breakTimer);
                resetFocusTimer(); 
            }
        }, 1000);
    }

    function resetFocusTimer() {
        clearInterval(timer);
        clearInterval(breakTimer);
        focusTime = 25 * 60;
        timerDisplay.textContent = "25:00";
        
        // Reset buttons correctly
        startBtn.style.display = "inline-block";
        pauseBtn.classList.add("hidden");
        resetBtn.classList.add("hidden");
        pauseBtn.textContent = "Pause"; // Ensure it resets to "Pause" not "Resume"
        isPaused = false; // Reset pause state

        // Hide break message
        breakMessage.classList.add("hidden"); 
        breakMessage.style.display = "none"; 
    }

    function pauseFocusTimer() {
        isPaused = !isPaused;
        pauseBtn.textContent = isPaused ? "Resume" : "Pause";
    }

    function skipBreak() { 
        clearInterval(breakTimer);
        resetFocusTimer();
    }

    startBtn.addEventListener("click", startFocusTimer);
    pauseBtn.addEventListener("click", pauseFocusTimer);
    resetBtn.addEventListener("click", resetFocusTimer);
    skipBreakBtn.addEventListener("click", skipBreak);
});
