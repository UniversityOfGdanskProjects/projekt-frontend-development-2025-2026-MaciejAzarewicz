// src/context/ChatProvider.jsx
import React, { useState } from 'react';
import { ChatContext } from './ChatContext';

export function ChatProvider({ children }) {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Anna' },
    { id: 2, name: 'Bartek' },
    { id: 3, name: 'Kasia' },
  ]);

  const [activeChatId, setActiveChatId] = useState(null);

  // Używamy setContacts poprzez funkcję addContact — to też przyda się później
  const addContact = (name) => {
    setContacts(prev => {
      const nextId = prev.length ? Math.max(...prev.map(c => c.id)) + 1 : 1;
      return [...prev, { id: nextId, name }];
    });
  };

  return (
    <ChatContext.Provider value={{
      contacts,
      activeChatId,
      setActiveChatId,
      addContact
    }}>
      {children}
    </ChatContext.Provider>
  );
}
