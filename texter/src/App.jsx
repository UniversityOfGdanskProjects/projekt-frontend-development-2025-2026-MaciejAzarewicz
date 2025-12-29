import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserProvider';
import { useUser } from './hooks/useUser';
import { ChatProvider } from './context/ChatProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Header from './components/Header';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import ChatPlaceholder from './components/ChatPlaceholder';
import Settings from './components/Settings';
import NotFound from './components/NotFound';

import './styles/main.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

function ProtectedRoute({ children }) {
  const { userName } = useUser();

  if (!userName) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function ChatApp() {
  return (
    <div className="app">
      <Header />

      <div className="layout">
        <Sidebar />
        <main className="chat-area">
          <ChatPlaceholder />
          <Settings />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserProvider>
          <ChatProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <ChatApp />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ChatProvider>
        </UserProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}