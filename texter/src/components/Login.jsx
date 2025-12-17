import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

export default function Login() {
  const { userName, setUserName } = useContext(UserContext);
  const [value, setValue] = useState('');

  if (userName) return null;

  return (
    <div className="login">
      <h2>Podaj swoje imię</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (value.trim()) {
            setUserName(value.trim());
          }
        }}
      >
        <input
          type="text"
          placeholder="Twoje imię"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button>Zapisz</button>
      </form>
    </div>
  );
}
