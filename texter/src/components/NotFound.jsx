import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Strona nie znaleziona</h2>
        <p>Przepraszamy, ale strona której szukasz nie istnieje.</p>
        <button onClick={() => navigate('/')}>
          Wróć do aplikacji
        </button>
      </div>
    </div>
  );
}