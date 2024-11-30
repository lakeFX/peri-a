import { useEffect } from 'react';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { useAuthStore } from '../../store/authStore';
import { loginRequest } from './config';

export function useAuth() {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const { login, logout } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && accounts[0]) {
      login({
        id: accounts[0].localAccountId,
        name: accounts[0].name || '',
        email: accounts[0].username,
        role: 'staff', // Role should be fetched from your backend
      });
    }
  }, [isAuthenticated, accounts]);

  const handleLogin = async () => {
    try {
      await instance.loginPopup(loginRequest);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    instance.logoutPopup();
    logout();
  };

  return {
    isAuthenticated,
    user: accounts[0],
    login: handleLogin,
    logout: handleLogout,
  };
}