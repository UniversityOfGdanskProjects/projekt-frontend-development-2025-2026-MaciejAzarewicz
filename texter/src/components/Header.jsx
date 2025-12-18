import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

export default function Header() {
const { userName, status, setStatus } = useContext(UserContext);
const [showStatusSelector, setShowStatusSelector] = useState(false);

const statusOptions = ['Dostępny', 'Zaraz wracam', 'Nie przeszkadzać', 'Zajęty'];

function handleStatusChange(newStatus) {
setStatus(newStatus);
setShowStatusSelector(false);
}

return (
<header className="header">
<h1>Texter</h1>

<div className="user-info">
{userName && (
<>
<span className="user-name">Zalogowany: {userName}</span>

<div className="status-selector">
<button 
className="status-button"
onClick={() => setShowStatusSelector(!showStatusSelector)}
title="Kliknij aby zmienić status"
>
<span className={`status-dot ${status.toLowerCase().replace(' ', '-')}`}></span>
{status}
<span className="dropdown-arrow">▼</span>
</button>

{showStatusSelector && (
<div className="status-dropdown">
{statusOptions.map((option) => (
<button
key={option}
className={`status-option ${status === option ? 'active' : ''}`}
onClick={() => handleStatusChange(option)}
>
<span className={`status-dot ${option.toLowerCase().replace(' ', '-')}`}></span>
{option}
</button>
))}
</div>
)}
</div>
</>
)}
</div>
</header>
);
}