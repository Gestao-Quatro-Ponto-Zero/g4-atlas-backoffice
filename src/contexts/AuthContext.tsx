import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockUser } from '../data/mockData';

interface AuthContextType {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(mockUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Auto-login with mock user
    setUser(mockUser);
  }, []);

  const login = async (email: string, password: string) => {
    // Not needed anymore, but keeping for compatibility
    setUser(mockUser);
  };

  const logout = () => {
    // Not needed anymore, but keeping for compatibility
    setUser(mockUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: true, // Always authenticated
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
