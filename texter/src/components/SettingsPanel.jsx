import { useContext, useState } from 'react';
import { ChatContext } from '../context/ChatContext';

export default function SettingsPanel() {
  const { showTime, setShowTime, clearAllMessages } = useContext(ChatContext);
  const [isClearing, setIsClearing] = useState(false);

  const handleClearAll = () => {
    setIsClearing(true);
    clearAllMessages();
    setTimeout(() => setIsClearing(false), 500);
  };

  return (
    <div className="settings-panel">
      <h3>Ustawienia</h3>
      
      <div className="setting-item">
        <label className="setting-label">
          <input 
            type="checkbox" 
            checked={showTime} 
            onChange={(e) => setShowTime(e.target.checked)}
            className="setting-checkbox"
          />
          <span className="setting-text">
            Pokaż godzinę wysłania wiadomości
          </span>
        </label>
      </div>

      <div className="setting-item">
        <button 
          className="clear-chat-btn"
          onClick={handleClearAll}
          disabled={isClearing}
        >
          {isClearing ? 'Czyszczenie...' : 'Wyczyść wszystkie czaty'}
        </button>
      </div>
    </div>
  );
}