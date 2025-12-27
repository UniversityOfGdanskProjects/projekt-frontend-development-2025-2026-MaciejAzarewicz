import { UserProvider } from './context/UserProvider';
import { ChatProvider } from './context/ChatProvider';

import Header from './components/Header';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import ChatPlaceholder from './components/ChatPlaceholder';
import Settings from './components/Settings';

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
              <Settings />
            </main>
          </div>

          <Login />
        </div>
      </ChatProvider>
    </UserProvider>
  );
}