import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { verifyToken, getAuthToken, removeAuthToken } from '../../lib/auth';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login, logout } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      const token = getAuthToken();
      
      if (!token) {
        if (!isPublicRoute(location.pathname)) {
          navigate('/login');
        }
        return;
      }

      try {
        const user = await verifyToken(token);
        login(user);
      } catch (error) {
        removeAuthToken();
        logout();
        navigate('/login');
      }
    };

    initAuth();
  }, []);

  return <>{children}</>;
}

function isPublicRoute(pathname: string): boolean {
  const publicRoutes = ['/login', '/forgot-password', '/reset-password'];
  return publicRoutes.includes(pathname);
}