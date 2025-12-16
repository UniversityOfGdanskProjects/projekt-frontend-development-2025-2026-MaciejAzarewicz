import { useState, useContext, useRef } from 'react';
import { ChatContext } from '../context/ChatContext';

const EMOJIS = ['😀', '😂', '❤️', '👍'];

export default function ChatInput() {
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  const { activeContactId, sendMessage } = useContext(ChatContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage(activeContactId, text);
    setText('');
    inputRef.current?.focus();
  }

  function addEmoji(emoji) {
    setText((prev) => prev + emoji);
  }

  return (
    <form onSubmit={handleSubmit} className="chat-input">
      <div className="emoji-bar">
        {EMOJIS.map((e) => (
          <span key={e} onClick={() => addEmoji(e)}>
            {e}
          </span>
        ))}
      </div>

      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Napisz wiadomość..."
      />

      <button type="submit">➤</button>
    </form>
  );
}
