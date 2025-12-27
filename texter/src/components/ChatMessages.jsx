import { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { ChatContext } from '../context/ChatContext';

export default function ChatMessages() {
  const { activeContactId, messages, showTime, editMessage } = useContext(ChatContext);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const ref = useRef(null);

  const list = activeContactId ? messages[activeContactId] : [];

  // useCallback hooks muszą być wywołane PRZED wczesnym returnem
  const formatTime = useCallback((timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pl-PL', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }, []);

  const handleEdit = useCallback((msg) => {
    if (msg.author !== 'me') return;
    setEditingId(msg.id);
    setEditText(msg.text);
  }, []);

  const handleSaveEdit = useCallback(() => {
    if (editingId && editText.trim() && activeContactId) {
      editMessage(activeContactId, editingId, editText.trim());
    }
    setEditingId(null);
    setEditText('');
  }, [editingId, editText, activeContactId, editMessage]);

  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
    setEditText('');
  }, []);

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
            <div className="bubble">
                {editingId === msg.id ? (
                  <div className="edit-mode">
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="edit-textarea"
                      rows={2}
                    />
                    <div className="edit-actions">
                      <button onClick={handleSaveEdit} className="save-btn">
                        Zapisz
                      </button>
                      <button onClick={handleCancelEdit} className="cancel-btn">
                        Anuluj
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="message-text">{msg.text}</div>
                    {msg.edited && (
                      <div className="edited-indicator">Edytowano</div>
                    )}
                    {/* Godzina pokazuje się tylko jeśli showTime jest true */}
                    {showTime && (
                      <div className="message-time">
                        {formatTime(msg.timestamp)}
                      </div>
                    )}
                    {/* Ikona edycji tylko dla wiadomości użytkownika */}
                    {msg.author === 'me' && (
                      <button 
                        className="edit-btn"
                        onClick={() => handleEdit(msg)}
                        title="Edytuj wiadomość"
                      >
                      </button>
                    )}
                  </>
                )}
            </div>
        </div>
        ))}
    </div>
  );
}