// --- Zmienne globalne ---
    let workMinutes = 25;
    let breakMinutes = 5;
    let isRunning = false;
    let isWorkTime = true;
    let timerInterval = null;
    let currentSeconds = workMinutes * 60;

    // --- Elementy DOM ---
    const minutesDisplay = document.getElementById("minutes");
    const secondsDisplay = document.getElementById("seconds");
    const startBtn = document.getElementById("start-btn");
    const pauseBtn = document.getElementById("pause-btn");
    const resetBtn = document.getElementById("reset-btn");
    const workInput = document.getElementById("work-duration");
    const breakInput = document.getElementById("break-duration");
    const settingsDiv = document.querySelector(".settings");
    const notification = document.getElementById("notification");
    const notificationText = document.getElementById("notification-text");

    // --- Funkcja wyświetlania notyfikacji ---
    function showNotification(text) {
      notificationText.textContent = text;
      notification.classList.add("show");
      setTimeout(() => {
        notification.classList.remove("show");
      }, 2000);
    }

    // --- Funkcja odtwarzania dźwięku ---
    function playSound() {
      const audio = new Audio('ping.mp3');
      audio.play();
    }

    // --- Funkcja aktualizacji wyświetlacza ---
    function updateDisplay(minutes, seconds) {
      minutesDisplay.textContent = minutes.toString().padStart(2, "0");
      secondsDisplay.textContent = seconds.toString().padStart(2, "0");
    }

    // --- Funkcja startu timera ---
    function startTimer() {
      if (isRunning) return;
      isRunning = true;

      // Ukryj ustawienia podczas odliczania
      settingsDiv.classList.add("hidden");

      timerInterval = setInterval(() => {
        const minutes = Math.floor(currentSeconds / 60);
        const seconds = currentSeconds % 60;
        updateDisplay(minutes, seconds);

        if (currentSeconds === 0) {
          isWorkTime = !isWorkTime;
          currentSeconds = (isWorkTime ? workMinutes : breakMinutes) * 60;
          
          playSound();
          showNotification(isWorkTime ? "Czas pracy!" : "Czas przerwy!");
          
          // Automatycznie uruchom następny interwał
          setTimeout(() => {
            startTimer();
          }, 2000);
        }

        currentSeconds--;
      }, 1000);
    }

    // --- Funkcja pauzy ---
    function pauseTimer() {
      clearInterval(timerInterval);
      isRunning = false;
      settingsDiv.classList.remove("hidden");
    }

    // --- Funkcja resetu ---
    function resetTimer() {
      clearInterval(timerInterval);
      isRunning = false;

      // Przywróć ustawienia
      settingsDiv.classList.remove("hidden");

      // Reset czasu do aktualnego trybu
      currentSeconds = (isWorkTime ? workMinutes : breakMinutes) * 60;
      updateDisplay(Math.floor(currentSeconds / 60), currentSeconds % 60);
    }

    // --- Eventy przycisków ---
    startBtn.addEventListener("click", startTimer);
    pauseBtn.addEventListener("click", pauseTimer);
    resetBtn.addEventListener("click", resetTimer);

    // --- Eventy inputów ---
    workInput.addEventListener("input", () => {
      let val = parseInt(workInput.value);
      if (val < 15) workInput.value = 15;
      if (val > 60) workInput.value = 60;
      workMinutes = parseInt(workInput.value);
      if (isWorkTime && !isRunning) {
        currentSeconds = workMinutes * 60;
        updateDisplay(workMinutes, 0);
      }
    });

    breakInput.addEventListener("input", () => {
      let val = parseInt(breakInput.value);
      if (val < 5) breakInput.value = 5;
      if (val > 15) breakInput.value = 15;
      breakMinutes = parseInt(breakInput.value);
      if (!isWorkTime && !isRunning) {
        currentSeconds = breakMinutes * 60;
        updateDisplay(breakMinutes, 0);
      }
    });

    // --- Inicjalizacja wyświetlacza ---
    updateDisplay(Math.floor(currentSeconds / 60), currentSeconds % 60);