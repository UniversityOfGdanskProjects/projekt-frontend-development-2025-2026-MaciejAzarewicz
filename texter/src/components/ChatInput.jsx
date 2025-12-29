import React, { useState, useContext, useRef, useCallback } from 'react';
import { ChatContext } from '../context/ChatContext';

const EMOJIS = ['😀', '😂', '❤️', '👍'];

const ChatInput = React.memo(() => {
const [text, setText] = useState('');
const inputRef = useRef(null);
const { activeContactId, sendMessage } = useContext(ChatContext);

const handleSubmit = useCallback((e) => {
e.preventDefault();
if (!text.trim() || !activeContactId) return;

sendMessage(activeContactId, text);
setText('');

setTimeout(() => {
inputRef.current?.focus();
}, 100);
}, [text, activeContactId, sendMessage]);

const addEmoji = useCallback((emoji) => {
setText((prev) => prev + emoji);
}, []);

const handleTextChange = useCallback((e) => {
setText(e.target.value);
}, []);

return (
<form onSubmit={handleSubmit} className="chat-input">
<div className="emoji-bar">
{EMOJIS.map((emoji) => (
<span 
key={emoji} 
onClick={() => addEmoji(emoji)}
role="button"
tabIndex={0}
onKeyPress={(e) => e.key === 'Enter' && addEmoji(emoji)}
>
{emoji}
</span>
))}
</div>

<input
ref={inputRef}
value={text}
onChange={handleTextChange}
placeholder="Napisz wiadomość..."
disabled={!activeContactId}
aria-label="Message input"
/>

<button 
type="submit" 
disabled={!text.trim() || !activeContactId}
aria-label="Send message"
>
➤
</button>
</form>
);
});

ChatInput.displayName = 'ChatInput';

export default ChatInput;