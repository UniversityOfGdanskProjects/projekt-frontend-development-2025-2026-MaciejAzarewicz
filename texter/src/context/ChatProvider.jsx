import { useState } from 'react';
import { ChatContext } from './ChatContext';

const BOT_REPLIES = [
  'OK',
];

export function ChatProvider({ children }) {
  const [contacts] = useState([
    { id: 1, name: 'Anna' },
    { id: 2, name: 'Bartek' },
    { id: 3, name: 'Kasia' },
  ]);

  const [activeContactId, setActiveContactId] = useState(null);

  const [messages, setMessages] = useState({
    1: [],
    2: [],
    3: [],
  });

  function sendMessage(contactId, text) {
    // wiadomość użytkownika
    setMessages((prev) => ({
      ...prev,
      [contactId]: [
        ...prev[contactId],
        {
          id: Date.now(),
          author: 'me',
          text,
        },
      ],
    }));

    // odpowiedź bota
    setTimeout(() => {
      const reply =
        BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)];

      setMessages((prev) => ({
        ...prev,
        [contactId]: [
          ...prev[contactId],
          {
            id: Date.now() + 1,
            author: 'bot',
            text: reply,
          },
        ],
      }));
    }, 2000 + Math.random() * 1000);
  }

  return (
    <ChatContext.Provider
      value={{
        contacts,
        activeContactId,
        setActiveContactId,
        messages,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
