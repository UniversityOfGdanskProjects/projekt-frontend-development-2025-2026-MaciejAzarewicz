import { useState, useEffect, useCallback, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ChatContext } from "./ChatContext";

const BOT_REPLIES = [
  "OK",
  "Rozumiem",
  "Ciekawe",
  "Dziękuję",
  "To ma sens",
  "Jasne",
];

async function fetchContacts() {
  const response = await fetch(
    'data:application/json,[{"id":1,"name":"Anna"},{"id":2,"name":"Bartek"},{"id":3,"name":"Kasia"}]',
  );
  if (!response.ok) {
    throw new Error("Failed to fetch contacts");
  }
  return response.json();
}

function useContacts() {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: fetchContacts,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export function ChatProvider({ children }) {
  const queryClient = useQueryClient();
  const { data: contactsData, isLoading, error } = useContacts();

  const [contacts, setContacts] = useState([]);
  const [activeContactId, setActiveContactId] = useState(null);
  const [showTime, setShowTime] = useState(false);
  const [messages, setMessages] = useState({});

  const initializedContactsRef = useRef(new Set());

  useEffect(() => {
    if (contactsData && contactsData.length > 0) {
      setContacts(contactsData);

      const newMessages = {};
      let hasChanges = false;

      contactsData.forEach((contact) => {
        if (!initializedContactsRef.current.has(contact.id)) {
          newMessages[contact.id] = [];
          initializedContactsRef.current.add(contact.id);
          hasChanges = true;
        }
      });

      if (hasChanges) {
        setMessages((prev) => ({
          ...prev,
          ...newMessages,
        }));
      }
    }
  }, [contactsData]);

  useEffect(() => {
    if (error && contacts.length === 0) {
      setContacts([
        { id: 1, name: "Anna" },
        { id: 2, name: "Bartek" },
        { id: 3, name: "Kasia" },
      ]);
    }
  }, [error, contacts.length]);

  const addContact = useCallback(
    (name) => {
      if (!name.trim()) return;

      const newContact = {
        id: Date.now(),
        name: name.trim(),
      };

      setContacts((prev) => [...prev, newContact]);
      setMessages((prev) => ({
        ...prev,
        [newContact.id]: [],
      }));

      initializedContactsRef.current.add(newContact.id);

      queryClient.setQueryData(["contacts"], (oldContacts) => {
        return oldContacts ? [...oldContacts, newContact] : [newContact];
      });
    },
    [queryClient],
  );

  const sendMessage = useCallback((contactId, text) => {
    if (!contactId || !text.trim()) return;

    const userMessage = {
      id: Date.now(),
      author: "me",
      text: text.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => ({
      ...prev,
      [contactId]: [...(prev[contactId] || []), userMessage],
    }));

    const reply = BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)];

    setTimeout(
      () => {
        const botMessage = {
          id: Date.now() + 1,
          author: "bot",
          text: reply,
          timestamp: new Date().toISOString(),
        };

        setMessages((prev) => ({
          ...prev,
          [contactId]: [...(prev[contactId] || []), botMessage],
        }));
      },
      2000 + Math.random() * 1000,
    );
  }, []);

  const editMessage = useCallback((contactId, messageId, newText) => {
    if (!contactId || !newText.trim()) return;

    setMessages((prev) => ({
      ...prev,
      [contactId]: prev[contactId].map((msg) =>
        msg.id === messageId && msg.author === "me"
          ? {
              ...msg,
              text: newText.trim(),
              edited: true,
              editTimestamp: new Date().toISOString(),
            }
          : msg,
      ),
    }));
  }, []);

  const clearAllMessages = useCallback(() => {
    setMessages((prev) => {
      const emptyMessages = {};
      Object.keys(prev).forEach((contactId) => {
        emptyMessages[contactId] = [];
      });
      return emptyMessages;
    });
  }, []);

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
        isLoading,
        error,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
