import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'sanny2024', // Change this to your desired password
};

const AUTH_KEY = 'portfolio_auth';

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem(AUTH_KEY);
    if (saved) {
      const { expiry } = JSON.parse(saved);
      return new Date().getTime() < expiry;
    }
    return false;
  });

  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    // Check if session is expired
    const checkAuth = () => {
      const saved = localStorage.getItem(AUTH_KEY);
      if (saved) {
        const { expiry } = JSON.parse(saved);
        if (new Date().getTime() >= expiry) {
          logout();
        }
      }
    };

    const interval = setInterval(checkAuth, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const login = (username, password) => {
    setLoginError('');

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const expiry = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours
      localStorage.setItem(AUTH_KEY, JSON.stringify({ expiry }));
      setIsAuthenticated(true);
      return true;
    } else {
      setLoginError('Invalid username or password');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    login,
    logout,
    loginError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
