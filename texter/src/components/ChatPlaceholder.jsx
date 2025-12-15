import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

export default function ChatPlaceholder() {
  const { activeChatId, contacts } = useContext(ChatContext);

  if (!activeChatId) {
    return <p>Wybierz rozmowę z listy</p>;
  }

  const contact = contacts.find(c => c.id === activeChatId);

  return <h2>Rozmowa z: {contact.name}</h2>;
}
