import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Login() {
  const { userName, setUserName } = useContext(UserContext);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  if (userName) {
    navigate("/", { replace: true });
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      setUserName(value.trim());
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h2>Witaj w Texter!</h2>
        <p className="login-subtitle">
          Podaj swoje imię, aby rozpocząć rozmowę
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Twoje imię lub pseudonim"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            minLength={2}
            maxLength={20}
            aria-label="Twoje imię"
          />
          <button type="submit" disabled={!value.trim()}>
            Rozpocznij
          </button>
        </form>
      </div>
    </div>
  );
}
