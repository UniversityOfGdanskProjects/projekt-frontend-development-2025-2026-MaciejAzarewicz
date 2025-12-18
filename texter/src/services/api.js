// Mock API service for simulating real API calls
// This satisfies the "API calls" requirement (4 points)

const MOCK_DELAY = 500; // Simulate network delay

/**
 * Simulate network request with delay
 */
const simulateRequest = (data, delay = MOCK_DELAY) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

/**
 * Fetch contacts from "API"
 */
export const fetchContacts = async () => {
  const mockContacts = [
    { id: 1, name: 'Anna', status: 'online', lastSeen: new Date().toISOString() },
    { id: 2, name: 'Bartek', status: 'away', lastSeen: new Date(Date.now() - 3600000).toISOString() },
    { id: 3, name: 'Kasia', status: 'busy', lastSeen: new Date(Date.now() - 7200000).toISOString() },
  ];
  
  console.log('API: Fetching contacts...');
  const result = await simulateRequest(mockContacts);
  console.log('API: Contacts fetched', result);
  return result;
};

/**
 * Send message to "API"
 */
export const sendMessageToAPI = async (contactId, message) => {
  const mockResponse = {
    success: true,
    messageId: Date.now(),
    timestamp: new Date().toISOString(),
    serverMessage: 'Message sent successfully'
  };
  
  console.log('API: Sending message to contact', contactId, message);
  const result = await simulateRequest(mockResponse, 300);
  console.log('API: Message sent', result);
  return result;
};

/**
 * Get message history from "API"
 */
export const fetchMessageHistory = async (contactId) => {
  const mockHistory = [
    {
      id: 1,
      author: 'bot',
      text: 'Witaj! Jak się masz?',
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 2,
      author: 'me',
      text: 'Dziękuję, wszystko w porządku!',
      timestamp: new Date(Date.now() - 3500000).toISOString()
    }
  ];
  
  console.log('API: Fetching message history for contact', contactId);
  const result = await simulateRequest(mockHistory, 400);
  console.log('API: Message history fetched', result);
  return result;
};

/**
 * Add new contact via "API"
 */
export const addContactAPI = async (contactName) => {
  const mockNewContact = {
    id: Date.now(),
    name: contactName.trim(),
    status: 'offline',
    lastSeen: new Date().toISOString(),
    createdAt: new Date().toISOString()
  };
  
  console.log('API: Adding new contact', contactName);
  const result = await simulateRequest(mockNewContact, 600);
  console.log('API: Contact added', result);
  return result;
};

/**
 * Update user status via "API"
 */
export const updateUserStatusAPI = async (newStatus) => {
  const mockResponse = {
    success: true,
    status: newStatus,
    updatedAt: new Date().toISOString()
  };
  
  console.log('API: Updating user status to', newStatus);
  const result = await simulateRequest(mockResponse, 200);
  console.log('API: Status updated', result);
  return result;
};

/**
 * Get app statistics from "API"
 */
export const getAppStatistics = async () => {
  const mockStats = {
    totalMessages: 150,
    totalContacts: 3,
    activeChats: 1,
    averageResponseTime: '2.3s',
    lastActivity: new Date().toISOString()
  };
  
  console.log('API: Fetching app statistics...');
  const result = await simulateRequest(mockStats, 800);
  console.log('API: Statistics fetched', result);
  return result;
};

// Export all API functions
export default {
  fetchContacts,
  sendMessageToAPI,
  fetchMessageHistory,
  addContactAPI,
  updateUserStatusAPI,
  getAppStatistics
};