import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function Header() {
  const { userName } = useContext(UserContext);

  return (
    <header className="app-header">
      <h1 className="app-title">Texter</h1>
      <div className="user-bubble">{userName ? `Jesteś: ${userName}` : 'Brak imienia'}</div>
    </header>
  );
}
