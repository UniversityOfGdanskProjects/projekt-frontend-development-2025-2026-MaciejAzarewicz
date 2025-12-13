import React from 'react';
import { UserProvider } from './context/UserProvider';
import Header from './components/Header';
import Login from './components/Login';
import './styles/main.scss';

export default function App() {
  return (
    <UserProvider>
      <div className="app">
        <Header />
        <main className="app-main">
          <p>test</p>
        </main>
        <Login />
      </div>
    </UserProvider>
  );
}
