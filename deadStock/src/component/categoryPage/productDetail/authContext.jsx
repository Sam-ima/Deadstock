// src/contexts/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('deadstock_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('deadstock_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('deadstock_user');
  };

  const updateB2BStatus = (b2bData) => {
    setUser(prev => {
      const updated = { ...prev, ...b2bData, isB2BVerified: true };
      localStorage.setItem('deadstock_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateB2BStatus }}>
      {children}
    </AuthContext.Provider>
  );
};