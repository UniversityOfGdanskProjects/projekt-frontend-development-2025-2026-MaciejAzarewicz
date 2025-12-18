import { useState, useEffect, useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import api from '../services/api';

export default function StatisticsPanel() {
  const { contacts, messages } = useContext(ChatContext);
  const [stats, setStats] = useState(null);



  // Załaduj statystyki przy montowaniu komponentu
  useEffect(() => {
    const loadData = async () => {
      const apiStats = await api.getAppStatistics();
      setStats(apiStats);
      console.log('Statystyki załadowane z API:', apiStats);
    };
    loadData();
  }, [contacts, messages]); // Odśwież gdy zmienią się kontakty/wiadomości

  // Funkcja do liczenia lokalnych statystyk
  const getLocalStats = () => {
    const totalMessages = Object.values(messages).reduce((sum, msgs) => sum + msgs.length, 0);
    const totalContacts = contacts.length;
    const activeChats = Object.values(messages).filter(msgs => msgs.length > 0).length;

    return {
      totalMessages,
      totalContacts,
      activeChats,
      averageResponseTime: '1.8s', // Mock value
    };
  };

  const localStats = getLocalStats();

  return (
    <div className="statistics-panel">
      <div className="stats-header">
        <h3>Statystyki aplikacji</h3>
        <button 
          className="refresh-stats-btn" 
          onClick={() => {
            const loadData = async () => {
              const apiStats = await api.getAppStatistics();
              setStats(apiStats);
              console.log('Statystyki załadowane z API:', apiStats);
            };
            loadData();
          }}
          disabled={false}
        >
          Refresh
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{localStats.totalMessages}</div>
          <div className="stat-label">Wiadomości</div>
        </div>

        <div className="stat-card">
          <div className="stat-number">{localStats.totalContacts}</div>
          <div className="stat-label">Kontakty</div>
        </div>

        <div className="stat-card">
          <div className="stat-number">{localStats.activeChats}</div>
          <div className="stat-label">Aktywne czaty</div>
        </div>

        <div className="stat-card">
          <div className="stat-number">{localStats.averageResponseTime}</div>
          <div className="stat-label">Średni czas odp.</div>
        </div>
      </div>

      {stats && (
        <div className="api-stats">
          <h4>Dane z API:</h4>
          <div className="api-stats-grid">
            <div>API Wiadomości: {stats.totalMessages}</div>
            <div>API Kontakty: {stats.totalContacts}</div>
            <div>API Aktywne: {stats.activeChats}</div>
            <div>API Czas odp.: {stats.averageResponseTime}</div>
          </div>
        </div>
      )}

      <div className="stats-footer">
        <small>
          Local: {localStats.totalMessages} msgs | 
          API: {stats ? stats.totalMessages : 'N/A'} msgs
        </small>
      </div>
    </div>
  );
}