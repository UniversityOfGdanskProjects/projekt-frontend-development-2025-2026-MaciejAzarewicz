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

    // --- Eventy inputów (skrócone) ---
    const clamp = (v, a, b) => Math.min(b, Math.max(a, Number(v) || a));

    workInput.addEventListener('input', () => {
      const v = workInput.value.trim();
      if (!v) return;
      const n = Number(v);
      if (!Number.isNaN(n) && n >= 15 && n <= 60) {
        workMinutes = n;
        if (isWorkTime && !isRunning) { currentSeconds = n * 60; updateDisplay(n, 0); }
      }
    });

    workInput.addEventListener('blur', () => {
      const n = clamp(workInput.value, 15, 60);
      workInput.value = n; workMinutes = n;
      if (isWorkTime && !isRunning) { currentSeconds = n * 60; updateDisplay(n, 0); }
    });

    breakInput.addEventListener('input', () => {
      const v = breakInput.value.trim();
      if (!v) return;
      const n = Number(v);
      if (!Number.isNaN(n) && n >= 5 && n <= 15) {
        breakMinutes = n;
        if (!isWorkTime && !isRunning) { currentSeconds = n * 60; updateDisplay(n, 0); }
      }
    });

    breakInput.addEventListener('blur', () => {
      const n = clamp(breakInput.value, 5, 15);
      breakInput.value = n; breakMinutes = n;
      if (!isWorkTime && !isRunning) { currentSeconds = n * 60; updateDisplay(n, 0); }
    });

    // --- Inicjalizacja wyświetlacza ---
    updateDisplay(Math.floor(currentSeconds / 60), currentSeconds % 60);