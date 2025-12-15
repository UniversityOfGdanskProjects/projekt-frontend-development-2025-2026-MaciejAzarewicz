// src/context/UserProvider.jsx
import React, { useState, useEffect } from 'react';
import { UserContext } from './userContext';

export function UserProvider({ children }) {
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('chat_username') || '';
  });

  useEffect(() => {
    if (userName && userName.trim()) {
      localStorage.setItem('chat_username', userName);
    } else {
      localStorage.removeItem('chat_username');
    }
  }, [userName]);

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
}
