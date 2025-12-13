import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

export default function Login() {
  const { userName, setUserName } = useContext(UserContext);
  const [name, setName] = useState(userName || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    setUserName(trimmed);
  };

  if (userName) return null;

  return (
    <div className="login-overlay">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Wpisz swoje imię</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Twoje imię"
          autoFocus
        />
        <button type="submit">Zaloguj</button>
      </form>
    </div>
  );
}
