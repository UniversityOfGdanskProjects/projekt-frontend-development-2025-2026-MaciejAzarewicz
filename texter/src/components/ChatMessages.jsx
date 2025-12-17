import { useContext, useEffect, useRef } from 'react';
import { ChatContext } from '../context/ChatContext';

export default function ChatMessages() {
  const { activeContactId, messages } = useContext(ChatContext);
  const ref = useRef(null);

  const list = activeContactId ? messages[activeContactId] : [];

  useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [list?.length]);

  if (!activeContactId) {
    return <p>Wybierz rozmowę</p>;
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pl-PL', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div ref={ref} style={{ maxHeight: '60vh', overflowY: 'auto' }}>
      {list.map((msg) => (
        <div
            key={msg.id}
            className={`message ${msg.author === 'me' ? 'me' : 'bot'}`}
        >
            <div className="bubble">
                <div className="message-text">{msg.text}</div>
                {/* Godzina zawsze się pokazuje */}
                <div className="message-time">
                    {formatTime(msg.timestamp)}
                </div>
            </div>
        </div>
        ))}
    </div>
  );
}