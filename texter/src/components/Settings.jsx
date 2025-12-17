import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

export default function Settings() {
  const { showTime, setShowTime } = useContext(ChatContext);

  return (
    <div className="settings">
      <label>
        <input type="checkbox" checked={showTime} onChange={e => setShowTime(e.target.checked)} />
        Pokaż godzinę wysłania wiadomości
      </label>
    </div>
  );
}
