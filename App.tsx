
import React, { useState, useEffect } from 'react';
import { Login } from './components/Auth';
import { Register } from './components/Auth';
import { Dashboard } from './components/Dashboard';

enum View {
  LOGIN,
  REGISTER,
  DASHBOARD
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.LOGIN);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      setCurrentView(View.DASHBOARD);
    }
  }, [token]);

  const handleLoginSuccess = (receivedToken: string) => {
    localStorage.setItem('token', receivedToken);
    setToken(receivedToken);
    setIsAuthenticated(true);
    setCurrentView(View.DASHBOARD);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
    setCurrentView(View.LOGIN);
  };

  const renderContent = () => {
    switch (currentView) {
      case View.LOGIN:
        return (
          <Login 
            onSuccess={handleLoginSuccess} 
            onNavigateToRegister={() => setCurrentView(View.REGISTER)} 
          />
        );
      case View.REGISTER:
        return (
          <Register 
            onSuccess={() => setCurrentView(View.LOGIN)} 
            onNavigateToLogin={() => setCurrentView(View.LOGIN)} 
          />
        );
      case View.DASHBOARD:
        return <Dashboard onLogout={handleLogout} token={token || ''} />;
      default:
        return <Login onSuccess={handleLoginSuccess} onNavigateToRegister={() => setCurrentView(View.REGISTER)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <h1 className="text-xl font-bold text-slate-800">SecureID</h1>
          </div>
          {isAuthenticated && (
            <button 
              onClick={handleLogout}
              className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
            >
              Sign Out
            </button>
          )}
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center p-4">
        {renderContent()}
      </main>

      <footer className="py-6 text-center text-slate-400 text-sm">
        <p>&copy; 2024 SecureID Systems. Encrypted using AES-256.</p>
      </footer>
    </div>
  );
};

export default App;
