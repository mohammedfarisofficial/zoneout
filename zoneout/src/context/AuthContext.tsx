// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
// import * as LocalStorage from '@services/local-storage';
import { appStorage } from '@services/mmkv-storage';

interface AuthContextProps {
  isLogged: boolean | null;
  setIsLogged: (value: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLogged, setIsLogged] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedStatus = appStorage.getItem('isLogged');
      setIsLogged(loggedStatus === 'true');
    };
    checkLoginStatus();
  }, []);

  const logout = async () => {
    appStorage.removeItem("isLogged")
    setIsLogged(false);
  };

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
