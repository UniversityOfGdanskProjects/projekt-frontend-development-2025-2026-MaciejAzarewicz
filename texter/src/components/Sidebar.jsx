import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import ContactItem from './ContactItem';

export default function Sidebar() {
  const { contacts } = useContext(ChatContext);

  return (
    <aside className="sidebar">
      <h3>Rozmowy</h3>
      <ul>
        {contacts.map(contact => (
          <ContactItem key={contact.id} contact={contact} />
        ))}
      </ul>
    </aside>
  );
}
