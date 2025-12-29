import { useLocalStorage } from '../hooks/useLocalStorage';
import React from 'react';
import { UserContext } from './UserContext';

export function UserProvider({ children }) {
  const [userName, setUserName] = useLocalStorage('chat_username', '');
  const [status, setStatus] = useLocalStorage('chat_status', 'Dostępny');

  return (
    <UserContext.Provider value={{
      userName,
      setUserName,
      status,
      setStatus
    }}>
      {children}
    </UserContext.Provider>
  );
}