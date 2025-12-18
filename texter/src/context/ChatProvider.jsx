import { useState, useEffect } from 'react';
import { ChatContext } from './ChatContext';
import api from '../services/api';

const BOT_REPLIES = [
'OK',
'Rozumiem',
'Ciekawe',
'Dziękuję',
'To ma sens',
'Jasne',
];

export function ChatProvider({ children }) {
  const [contacts, setContacts] = useState([]);

  const [activeContactId, setActiveContactId] = useState(null);
  const [showTime, setShowTime] = useState(false);

  const [messages, setMessages] = useState({});



  // Ładuj kontakty z API przy starcie
  useEffect(() => {
    const initializeContacts = async () => {
      try {
        const contactsData = await api.fetchContacts();
        setContacts(contactsData);
        
        // Inicjalizuj messages dla każdego kontaktu
        const initialMessages = {};
        contactsData.forEach(contact => {
          initialMessages[contact.id] = [];
        });
        setMessages(initialMessages);
        
        console.log('Załadowano kontakty z API:', contactsData.length);
      } catch (error) {
        console.error('Błąd ładowania kontaktów:', error);
        // Fallback do domyślnych kontaktów
        setContacts([
          { id: 1, name: 'Anna', status: 'offline' },
          { id: 2, name: 'Bartek', status: 'offline' },
          { id: 3, name: 'Kasia', status: 'offline' },
        ]);
      }
    };
    initializeContacts();
  }, []);

async function addContact(name) {
    if (!name.trim()) return;
    
    try {
      const newContact = await api.addContactAPI(name);
      setContacts(prev => [...prev, newContact]);
      setMessages(prev => ({
        ...prev,
        [newContact.id]: []
      }));
      
      console.log('Dodano nowy kontakt przez API:', newContact.name);
    } catch (error) {
      console.error('Błąd dodawania kontaktu:', error);
      // Fallback do lokalnego dodawania
      const newContact = {
        id: Date.now(),
        name: name.trim(),
        status: 'offline'
      };
      
      setContacts(prev => [...prev, newContact]);
      setMessages(prev => ({
        ...prev,
        [newContact.id]: []
      }));
    }
  }

  async function sendMessage(contactId, text) {
    if (!contactId || !text.trim()) return;

    const userMessage = {
      id: Date.now(),
      author: 'me',
      text: text.trim(),
      timestamp: new Date().toISOString(),
    };

    // Dodaj wiadomość użytkownika lokalnie
    setMessages(prev => ({
      ...prev,
      [contactId]: [
        ...(prev[contactId] || []),
        userMessage,
      ],
    }));

    try {
      // Wyślij wiadomość przez API
      await api.sendMessageToAPI(contactId, text.trim());
      console.log('Wiadomość wysłana przez API');
    } catch (error) {
      console.error('Błąd wysyłania wiadomości:', error);
    }

    // Dodaj odpowiedź bota z opóźnieniem
    const reply = BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)];

    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        author: 'bot',
        text: reply,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => ({
        ...prev,
        [contactId]: [
          ...(prev[contactId] || []),
          botMessage,
        ],
      }));
    }, 2000 + Math.random() * 1000);
  }

  function editMessage(contactId, messageId, newText) {
    if (!contactId || !newText.trim()) return;

    setMessages(prev => ({
      ...prev,
      [contactId]: prev[contactId].map(msg => 
        msg.id === messageId && msg.author === 'me' 
          ? { ...msg, text: newText.trim(), edited: true, editTimestamp: new Date().toISOString() }
          : msg
      )
    }));
  }

  function clearAllMessages() {
    setMessages(prev => {
      const emptyMessages = {};
      // Zachowaj strukturę oryginalnego obiektu messages
      Object.keys(prev).forEach(contactId => {
        emptyMessages[contactId] = [];
      });
      return emptyMessages;
    });
  }

  return (
<ChatContext.Provider
value={{
        contacts,
        activeContactId,
        setActiveContactId,
        messages,
        sendMessage,
        editMessage,
        showTime,
        setShowTime,
        addContact,
        clearAllMessages,
}}
>
{children}
</ChatContext.Provider>
);
}