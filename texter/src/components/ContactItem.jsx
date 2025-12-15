import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

export default function ContactItem({ contact }) {
  const { activeChatId, setActiveChatId } = useContext(ChatContext);

  const isActive = activeChatId === contact.id;

  return (
    <li
      className={`contact-item ${isActive ? 'active' : ''}`}
      onClick={() => setActiveChatId(contact.id)}
    >
      {contact.name}
    </li>
  );
}
