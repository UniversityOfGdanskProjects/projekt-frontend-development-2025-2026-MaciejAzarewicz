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

  return (
    <div ref={ref} style={{ maxHeight: '60vh', overflowY: 'auto' }}>
      {list.map((msg) => (
        <div
            key={msg.id}
            className={`message ${msg.author === 'me' ? 'me' : 'bot'}`}
        >
            <div className="bubble">{msg.text}</div>
        </div>
        ))}

    </div>
  );
}
