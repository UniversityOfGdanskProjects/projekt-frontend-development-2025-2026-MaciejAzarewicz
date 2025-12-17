import { useLocalStorage } from '../hooks/useLocalStorage';
import React, { useState, useEffect } from 'react';
import { UserContext } from './userContext';


export function UserProvider({ children }) {
  const [userName, setUserName] = useLocalStorage('chat_username', '');
  const [status, setStatus] = useLocalStorage('chat_status', 'Dostępny');

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
