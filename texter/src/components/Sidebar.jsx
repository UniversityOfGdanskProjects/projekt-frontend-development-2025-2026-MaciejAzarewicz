import React, { useContext, useState, useCallback, memo } from 'react';
import { ChatContext } from '../context/ChatContext';
import ContactItem from './ContactItem';

const Sidebar = memo(() => {
  const { contacts, addContact, isLoading, error } = useContext(ChatContext);
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

  const contactList = React.useMemo(() => {
    if (contacts.length === 0) {
      return <li className="no-contacts">Brak kontaktów. Dodaj nowy!</li>;
    }
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

      {isLoading && (
        <div className="sidebar-loading">
          <span className="loading-spinner"></span>
          Ładowanie kontaktów...
        </div>
      )}

      {error && (
        <div className="sidebar-error">
          Nie udało się pobrać kontaktów
        </div>
      )}

      <form onSubmit={handleAddContact} className="add-contact">
        <input
          type="text"
          value={newContactName}
          onChange={handleNameChange}
          placeholder="Dodaj kontakt..."
          aria-label="Dodaj kontakt"
          className="add-contact-input"
        />
        <button
          type="submit"
          disabled={!newContactName.trim()}
          className="add-contact-btn"
        >
          Dodaj
        </button>
      </form>

      <ul className="contact-list">
        {contactList}
      </ul>
    </div>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;