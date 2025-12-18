// Prosty przykład użycia API w komponencie
import React, { useState, useEffect } from 'react';
import api from '../services/api.js';

export function SimpleAPITest() {
  const [contacts, setContacts] = useState([]);



  // Automatyczne ładowanie przy montowaniu
  useEffect(() => {
    const loadData = async () => {
      const data = await api.fetchContacts();
      setContacts(data);
      console.log('Załadowano', data.length, 'kontaktów');
    };
    loadData();
  }, []);

  // Funkcja do testowania innych API
  const testAPI = async () => {
    console.log('Testowanie API:');
    
    // Test statystyk
    const stats = await api.getAppStatistics();
    console.log('Statystyki:', stats);
    
    // Test dodawania kontaktu
    const newContact = await api.addContactAPI('Test Kontakt');
    console.log('Nowy kontakt:', newContact);
    
    // Test zmiany statusu
    const statusUpdate = await api.updateUserStatusAPI('away');
    console.log('Status zaktualizowany:', statusUpdate);
  };

  return (
    <div className="api-test">
      <h3>Test API</h3>
      
      <div className="controls">
        <button onClick={() => {
          const loadData = async () => {
            const data = await api.fetchContacts();
            setContacts(data);
            console.log('Załadowano', data.length, 'kontaktów');
          };
          loadData();
        }} disabled={false}>
          Odśwież kontakty
        </button>
        
        <button onClick={testAPI}>
          Testuj API
        </button>
      </div>

      <div className="contacts-list">
        <h4>Kontakty ({contacts.length}):</h4>
        {contacts.map(contact => (
          <div key={contact.id} className="contact-item">
            <span>{contact.name}</span>
            <span className={`status status-${contact.status}`}>
              {contact.status}
            </span>
          </div>
        ))}
      </div>

      <div className="info">
        <small>
          Otwórz konsolę deweloperską (F12) żeby zobaczyć logi API
        </small>
      </div>
    </div>
  );
}

/*
UŻYCIE W APLIKACJI:

1. Importuj komponent:
   import { SimpleAPITest } from './src/example-simple';

2. Dodaj do JSX:
   <SimpleAPITest />

3. Otwórz konsolę (F12) żeby zobaczyć logi:
   API: Fetching contacts...
   API: Contacts fetched 3

4. Kliknij przyciski żeby przetestować różne funkcje API
*/