import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function Header() {
  const { userName } = useContext(UserContext);

  return (
    <header className="header">
      <h1>Texter</h1>
      {userName && <span>Zalogowany: {userName}</span>}
    </header>
  );
}
