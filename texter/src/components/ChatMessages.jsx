import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { ChatContext } from '../context/ChatContext';

// Memoized Message Component for optimization
const MessageComponent = React.memo(({ msg, showTime, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(msg.text);

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pl-PL', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleEdit = () => {
    if (isEditing) {
      if (editText.trim() && editText !== msg.text) {
        onEdit(msg.id, editText.trim());
      }
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setEditText(msg.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div
      className={`message ${msg.author === 'me' ? 'me' : 'bot'} ${msg.edited ? 'edited' : ''}`}
    >
      <div className="bubble">
        {isEditing ? (
          <div className="edit-mode">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              autoFocus
            />
            <button className="save-btn" onClick={handleEdit}>✓</button>
            <button className="cancel-btn" onClick={handleCancel}>✕</button>
          </div>
        ) : (
          <>
            <div 
              className="message-text" 
              onClick={msg.author === 'me' ? handleEdit : undefined}
              title={msg.author === 'me' ? 'Kliknij aby edytować' : ''}
            >
              {msg.text}
            </div>
            {showTime && msg.timestamp && (
              <div className="message-time">
                {formatTime(msg.timestamp)}
                {msg.edited && msg.editTimestamp && (
                  <span className="edit-time">
                    • {formatTime(msg.editTimestamp)}
                  </span>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
});

export default function ChatMessages() {
  const { activeContactId, messages, showTime, editMessage } = useContext(ChatContext);
  const ref = useRef(null);

  const list = activeContactId ? messages[activeContactId] : [];

  // Memoized message handler - MUST be called before any early returns
  const handleEditMessage = useCallback((messageId, newText) => {
    editMessage(activeContactId, messageId, newText);
  }, [editMessage, activeContactId]);

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
        <MessageComponent
          key={msg.id}
          msg={msg}
          showTime={showTime}
          onEdit={handleEditMessage}
        />
      ))}
    </div>
  );
}