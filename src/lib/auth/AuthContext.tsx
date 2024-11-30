import React, { createContext, useContext, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { useAuthStore } from '../../store/authStore';
import { loginRequest } from './config';

interface AuthContextType {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => Promise<string>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { instance, accounts } = useMsal();
  const { login: setAuth, logout: clearAuth } = useAuthStore();

  useEffect(() => {
    if (accounts[0]) {
      setAuth({
        id: accounts[0].localAccountId,
        name: accounts[0].name || '',
        email: accounts[0].username,
        role: 'staff',
      });
    }
  }, [accounts]);

  const login = async () => {
    try {
      await instance.loginPopup(loginRequest);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await instance.logoutPopup();
      clearAuth();
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  const getAccessToken = async () => {
    try {
      const account = accounts[0];
      if (!account) throw new Error('No active account');

      const response = await instance.acquireTokenSilent({
        ...loginRequest,
        account,
      });

      return response.accessToken;
    } catch (error) {
      console.error('Token acquisition failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ login, logout, getAccessToken }}>
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