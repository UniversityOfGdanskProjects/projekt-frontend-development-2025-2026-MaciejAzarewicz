import { UserProvider } from './context/UserProvider';
import { ChatProvider } from './context/ChatProvider';

import Header from './components/Header';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import ChatPlaceholder from './components/ChatPlaceholder';
import SettingsPanel from './components/SettingsPanel';
import StatisticsPanel from './components/StatisticsPanel';
import { SimpleAPITest } from './example-simple';

import './styles/main.scss';

export default function App() {
  return (
    <UserProvider>
      <ChatProvider>
        <div className="app">
          <Header />

          <div className="layout">
            <Sidebar />
            <main className="chat-area">
              <ChatPlaceholder />
              
              {/* Panel ustawień */}
              <SettingsPanel />
              
              {/* Panel statystyk - przykład użycia API */}
              <StatisticsPanel />
              
              {/* Test API - komponent demonstracyjny */}
              <SimpleAPITest />
            </main>
          </div>

          <Login />
        </div>
      </ChatProvider>
    </UserProvider>
  );
}