document.addEventListener("DOMContentLoaded", () => {
    let timerDisplay = document.getElementById("timer-display");
    let breakDisplay = document.getElementById("break-timer-display");
    let breakMessage = document.getElementById("break-message");
    let startBtn = document.getElementById("start-btn");
    let pauseBtn = document.getElementById("pause-btn");
    let resetBtn = document.getElementById("reset-btn");
    let skipBreakBtn = document.getElementById("skip-break-btn");
    let focusInput = document.getElementById("focus-time"); 
    let breakInput = document.getElementById("break-time"); 
    let saveSettingsBtn = document.getElementById("save-settings");
    let settingsPopup = document.getElementById("settings-popup");
    let settingsPopupMessage = document.getElementById("popup-message");

    let focusTime, breakTime;
    let timer, breakTimer;
    let isPaused = true;
    let currentMode = "focus"; 

    // Load settings from local storage
    function loadSettings() {
        focusTime = localStorage.getItem("focusTime") ? parseInt(localStorage.getItem("focusTime")) : 25 * 60;
        breakTime = localStorage.getItem("breakTime") ? parseInt(localStorage.getItem("breakTime")) : 5 * 60;
        isPaused = localStorage.getItem("isPaused") === "true"; 
        currentMode = localStorage.getItem("currentMode") || "focus";

        let savedTimeLeft = localStorage.getItem("timeLeft");
        let timeLeft = savedTimeLeft ? parseInt(savedTimeLeft) : focusTime;
        updateDisplay(timeLeft);

        focusInput.value = focusTime / 60;
        breakInput.value = breakTime / 60;
    }

    // Show popup message
    function showPopup(message, isError = false) {
        settingsPopupMessage.textContent = message;
        settingsPopup.style.backgroundColor = isError ? "#ff5252" : "#4caf50"; // Red for errors, green for success
        settingsPopup.style.display = "block";

        setTimeout(() => {
            settingsPopup.style.display = "none";
        }, 2500); // Hide after 2.5 seconds
    }

    // Save settings to local storage
    function saveSettings() {
        let newFocusTime = parseInt(focusInput.value);
        let newBreakTime = parseInt(breakInput.value);

        if (newFocusTime <= 0 || newBreakTime <= 0) {
            showPopup("Error: Time must be greater than 0!", true);
            return;
        }

        if (newFocusTime < newBreakTime) {
            showPopup("😂 Nice try! Focus time should be longer than break time!", true);
            return;
        }

        focusTime = newFocusTime * 60;
        breakTime = newBreakTime * 60;
        localStorage.setItem("focusTime", focusTime);
        localStorage.setItem("breakTime", breakTime);

        showPopup("Settings saved successfully! 🎉");
        resetFocusTimer();
    }

    function updateDisplay(timeLeft) {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    function startFocusTimer() {
        isPaused = false;
        localStorage.setItem("isPaused", isPaused);

        startBtn.style.display = "none";
        pauseBtn.classList.remove("hidden");
        resetBtn.classList.remove("hidden");

        let timeLeft = localStorage.getItem("timeLeft") ? parseInt(localStorage.getItem("timeLeft")) : focusTime;
        timer = setInterval(() => {
            if (!isPaused) {
                timeLeft--;
                localStorage.setItem("timeLeft", timeLeft);
                updateDisplay(timeLeft);

                if (timeLeft < 0) {
                    clearInterval(timer);
                    localStorage.removeItem("timeLeft");
                    showBreakMessage();
                }
            }
        }, 1000);
    }

    function pauseFocusTimer() {
        isPaused = !isPaused;
        localStorage.setItem("isPaused", isPaused);
        pauseBtn.textContent = isPaused ? "Resume" : "Pause";
    }

    function resetFocusTimer() {
        clearInterval(timer);
        clearInterval(breakTimer);
        localStorage.removeItem("timeLeft");
        localStorage.setItem("isPaused", true);
        currentMode = "focus";
        localStorage.setItem("currentMode", currentMode);
        updateDisplay(focusTime);
        startBtn.style.display = "inline-block";
        pauseBtn.classList.add("hidden");
        resetBtn.classList.add("hidden");
        breakMessage.classList.add("hidden");
        breakMessage.style.display = "none";
    }

    function showBreakMessage() {
        breakMessage.classList.remove("hidden");
        breakMessage.style.display = "block";
        startBreakTimer();
    }

    function startBreakTimer() {
        let breakTimeLeft = breakTime;
        breakTimer = setInterval(() => {
            breakTimeLeft--;
            breakDisplay.textContent = `${Math.floor(breakTimeLeft / 60)}:${breakTimeLeft % 60 < 10 ? "0" : ""}${breakTimeLeft % 60}`;

            if (breakTimeLeft < 0) {
                clearInterval(breakTimer);
                resetFocusTimer();
            }
        }, 1000);
    }

    function skipBreak() {
        clearInterval(breakTimer);
        resetFocusTimer();
    }

    loadSettings();

    startBtn.addEventListener("click", startFocusTimer);
    pauseBtn.addEventListener("click", pauseFocusTimer);
    resetBtn.addEventListener("click", resetFocusTimer);
    skipBreakBtn.addEventListener("click", skipBreak);
    saveSettingsBtn.addEventListener("click", saveSettings);
});
