import { useState } from 'react';
import { ChatContext } from './ChatContext';

const BOT_REPLIES = [
  'OK',
  'Rozumiem',
  'Ciekawe',
  'Dziękuję',
  'To ma sens',
  'Jasne',
];

export function ChatProvider({ children }) {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Anna' },
    { id: 2, name: 'Bartek' },
    { id: 3, name: 'Kasia' },
  ]);

  const [activeContactId, setActiveContactId] = useState(null);
  const [showTime, setShowTime] = useState(false);

  const [messages, setMessages] = useState({
    1: [],
    2: [],
    3: [],
  });

  function addContact(name) {
    const newContact = {
      id: Date.now(),
      name: name.trim()
    };
    
    setContacts(prev => [...prev, newContact]);
    setMessages(prev => ({
      ...prev,
      [newContact.id]: []
    }));
  }

  function sendMessage(contactId, text) {
    if (!contactId || !text.trim()) return;

    const userMessage = {
      id: Date.now(),
      author: 'me',
      text: text.trim(),
      timestamp: new Date().toISOString(),
    };

    // Dodaj wiadomość użytkownika
    setMessages(prev => ({
      ...prev,
      [contactId]: [
        ...(prev[contactId] || []),
        userMessage,
      ],
    }));

    // Dodaj odpowiedź bota z opóźnieniem
    const reply =
      BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)];

    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        author: 'bot',
        text: reply,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => ({
        ...prev,
        [contactId]: [
          ...(prev[contactId] || []),
          botMessage,
        ],
      }));
    }, 2000 + Math.random() * 1000);
  }

  function editMessage(contactId, messageId, newText) {
    if (!contactId || !newText.trim()) return;

    setMessages(prev => ({
      ...prev,
      [contactId]: prev[contactId].map(msg => 
        msg.id === messageId && msg.author === 'me' 
          ? { ...msg, text: newText.trim(), edited: true, editTimestamp: new Date().toISOString() }
          : msg
      )
    }));
  }

  function clearAllMessages() {
    setMessages(prev => {
      const emptyMessages = {};
      // Zachowaj strukturę oryginalnego obiektu messages
      Object.keys(prev).forEach(contactId => {
        emptyMessages[contactId] = [];
      });
      return emptyMessages;
    });
  }

  return (
    <ChatContext.Provider
      value={{
        contacts,
        activeContactId,
        setActiveContactId,
        messages,
        sendMessage,
        editMessage,
        showTime,
        setShowTime,
        addContact,
        clearAllMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}