import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

export default function ContactItem({ contact }) {
  const { activeContactId, setActiveContactId } = useContext(ChatContext);

  return (
    <li
      className={`contact-item ${
        activeContactId === contact.id ? 'active' : ''
      }`}
      onClick={() => setActiveContactId(contact.id)}
    >
      {contact.name}
    </li>
  );
}
