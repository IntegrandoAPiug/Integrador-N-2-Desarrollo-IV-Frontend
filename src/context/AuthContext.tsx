import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { apiFetch } from '../services/api';

interface RegisterData {
  username: string;
  email: string;
  password: string;
  password2: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem('accessToken');
    return Boolean(token && token !== 'demo-admin-token');
  });

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const data = await apiFetch<{ access: string; refresh: string }>('/auth/login/', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });

      if (data.access) {
        localStorage.setItem('accessToken', data.access);
      }
      if (data.refresh) {
        localStorage.setItem('refreshToken', data.refresh);
      }

      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<{ ok: boolean; error?: string }> => {
    try {
      await apiFetch('/auth/registro/', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      return { ok: true };
    } catch (error: any) {
      return { ok: false, error: error.message || 'No se pudo completar el registro' };
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};