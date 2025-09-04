import React, { useState } from 'react';
import HomePage from './components/HomePage';
import Chatbot from './components/Chatbot';

function App() {
  const [page, setPage] = useState('home'); // 'home' or 'chatbot'

  const NavLink: React.FC<{
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }> = ({ isActive, onClick, children }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </button>
  );

  return (
    <div className="bg-gray-900 text-white flex flex-col h-screen font-sans">
      <nav className="bg-gray-800 border-b border-blue-400/30 p-4 shadow-lg flex justify-between items-center shrink-0">
        <h1 className="text-xl font-bold text-blue-300">The Dream Lab</h1>
        <div className="flex items-center space-x-2">
          <NavLink isActive={page === 'home'} onClick={() => setPage('home')}>
            Home
          </NavLink>
          <NavLink isActive={page === 'chatbot'} onClick={() => setPage('chatbot')}>
            Dr. Rhesus
          </NavLink>
        </div>
      </nav>
      <main className="flex-1 overflow-hidden">
        {page === 'home' && <HomePage navigateToChat={() => setPage('chatbot')} />}
        {page === 'chatbot' && <Chatbot />}
      </main>
    </div>
  );
}

export default App;
