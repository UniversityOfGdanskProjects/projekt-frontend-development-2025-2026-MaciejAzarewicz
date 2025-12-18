import React, { useContext, useState, useCallback, memo } from 'react';
import { ChatContext } from '../context/ChatContext';
import ContactItem from './ContactItem';

// Memoized Sidebar component for performance optimization
const Sidebar = memo(() => {
const { contacts, addContact } = useContext(ChatContext);
const [newContactName, setNewContactName] = useState('');

const handleAddContact = useCallback((e) => {
e.preventDefault();

if (newContactName.trim() && addContact) {
addContact(newContactName.trim());
setNewContactName('');
}
}, [newContactName, addContact]);

const handleNameChange = useCallback((e) => {
setNewContactName(e.target.value);
}, []);

// Memoized contact list to prevent unnecessary re-renders
const contactList = React.useMemo(() => {
return contacts.map((contact) => (
<ContactItem 
key={contact.id} 
contact={contact} 
/>
));
}, [contacts]);

return (
<div className="sidebar">
<h3>Rozmowy</h3>

{/* Add Contact Form */}
<form onSubmit={handleAddContact} className="add-contact">
<input
type="text"
value={newContactName}
onChange={handleNameChange}
placeholder="Dodaj kontakt..."
aria-label="Dodaj kontakt"
style={{
flex: 1,
padding: '8px',
borderRadius: '6px',
border: '1px solid #ddd',
fontSize: '12px'
}}
/>
<button 
type="submit"
disabled={!newContactName.trim()}
style={{
padding: '8px 12px',
borderRadius: '6px',
background: newContactName.trim() ? '#4f46e5' : '#ccc',
color: '#fff',
border: 'none',
fontSize: '12px',
cursor: newContactName.trim() ? 'pointer' : 'not-allowed'
}}
>
Dodaj
</button>
</form>

<ul>
{contactList}
</ul>
</div>
);
});

// Add display name for better debugging
Sidebar.displayName = 'Sidebar';

export default Sidebar;