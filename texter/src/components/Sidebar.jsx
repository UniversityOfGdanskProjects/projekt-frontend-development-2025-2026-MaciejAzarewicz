import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import ContactItem from './ContactItem';
import AddContact from './AddContact';

export default function Sidebar() {
  const { contacts } = useContext(ChatContext);

  return (
    <div className="sidebar">
      <h3>Rozmowy</h3>
      <AddContact />
      
      <ul>
        {contacts.map((c) => (
          <ContactItem key={c.id} contact={c} />
        ))}
      </ul>
    </div>
  );
}