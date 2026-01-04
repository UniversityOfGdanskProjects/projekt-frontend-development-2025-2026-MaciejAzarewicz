import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export default function Header() {
  const { userName, status, setStatus } = useContext(UserContext);
  const [showStatusSelector, setShowStatusSelector] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const statusOptions = [
    "Dostępny",
    "Zaraz wracam",
    "Nie przeszkadzać",
    "Nieaktywny",
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    requestAnimationFrame(() => {
      setIsDarkMode(shouldBeDark);
      document.documentElement.setAttribute(
        "data-theme",
        shouldBeDark ? "dark" : "light",
      );
    });
  }, []);

  function handleStatusChange(newStatus) {
    setStatus(newStatus);
    setShowStatusSelector(false);
  }

  function toggleTheme() {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.setAttribute(
      "data-theme",
      newMode ? "dark" : "light",
    );
    localStorage.setItem("theme", newMode ? "dark" : "light");
  }

  return (
    <header className="header">
      <h1>Texter</h1>

      <div className="user-info">
        {userName && (
          <>
            <span className="user-name">Zalogowany: {userName}</span>

            <div className="status-selector">
              <button
                className="status-button"
                onClick={() => setShowStatusSelector(!showStatusSelector)}
                title="Kliknij aby zmienić status"
              >
                <span
                  className={`status-dot ${status.toLowerCase().replace(" ", "-")}`}
                ></span>
                {status}
                <span className="dropdown-arrow">▼</span>
              </button>

              {showStatusSelector && (
                <div className="status-dropdown">
                  {statusOptions.map((option) => (
                    <button
                      key={option}
                      className={`status-option ${status === option ? "active" : ""}`}
                      onClick={() => handleStatusChange(option)}
                    >
                      <span
                        className={`status-dot ${option.toLowerCase().replace(" ", "-")}`}
                      ></span>
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className="theme-toggle"
              onClick={toggleTheme}
              title={
                isDarkMode
                  ? "Przełącz na tryb jasny"
                  : "Przełącz na tryb ciemny"
              }
              aria-label={isDarkMode ? "Włącz tryb jasny" : "Włącz tryb ciemny"}
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>
          </>
        )}
      </div>
    </header>
  );
}
