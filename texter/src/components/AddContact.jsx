import { useState, useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

export default function AddContact() {
const [name, setName] = useState('');
const { addContact } = useContext(ChatContext);

function handleSubmit(e) {
e.preventDefault();
const trimmed = name.trim();
if (!trimmed) return;
addContact(trimmed);
setName('');
}

return (
<form onSubmit={handleSubmit} className="add-contact">
<input
value={name}
onChange={(e) => setName(e.target.value)}
placeholder="Dodaj kontakt..."
aria-label="Dodaj kontakt"
/>
<button type="submit">Dodaj</button>
</form>
);
}