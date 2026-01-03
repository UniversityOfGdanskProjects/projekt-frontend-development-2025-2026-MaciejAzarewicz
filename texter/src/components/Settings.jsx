import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

export default function Settings() {
  const { showTime, setShowTime, activeContactId, clearAllMessages } =
    useContext(ChatContext);

  if (!activeContactId) {
    return null;
  }

  return (
    <div className="settings">
      <label className="setting-label">
        <input
          type="checkbox"
          className="setting-checkbox"
          checked={showTime}
          onChange={(e) => setShowTime(e.target.checked)}
        />
        <span className="setting-text">Pokaż godzinę wysłania wiadomości</span>
      </label>

      <button className="clear-messages-btn" onClick={clearAllMessages}>
        Wyczyść wszystkie wiadomości
      </button>
    </div>
  );
}
