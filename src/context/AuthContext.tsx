import { createContext, useContext, useState, useEffect } from 'react';
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
  isAdmin: boolean;
  username: string | null;
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

  const [username, setUsername] = useState<string | null>(() => {
    return localStorage.getItem('username');
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  const checkAdminRole = async (user: string) => {
    try {
      const profile = await apiFetch<{ is_staff?: boolean; is_superuser?: boolean }>('/auth/me/', {
        auth: true,
      });
      const adminFlag = Boolean(profile.is_staff || profile.is_superuser);
      setIsAdmin(adminFlag);
      localStorage.setItem('isAdmin', String(adminFlag));
    } catch {
      // Respaldo si el endpoint /auth/me/ aún no está desplegado en Render
      const fallbackAdmin = user.toLowerCase() === 'admin';
      setIsAdmin(fallbackAdmin);
      localStorage.setItem('isAdmin', String(fallbackAdmin));
    }
  };

  useEffect(() => {
    if (isAuthenticated && username) {
      checkAdminRole(username);
    }
  }, [isAuthenticated, username]);

  const login = async (user: string, password: string): Promise<boolean> => {
    try {
      const data = await apiFetch<{ access: string; refresh: string }>('/auth/login/', {
        method: 'POST',
        body: JSON.stringify({ username: user, password }),
      });

      if (data.access) localStorage.setItem('accessToken', data.access);
      if (data.refresh) localStorage.setItem('refreshToken', data.refresh);
      localStorage.setItem('username', user);

      setUsername(user);
      setIsAuthenticated(true);
      await checkAdminRole(user);
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
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    setUsername(null);
    setIsAdmin(false);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, username, login, register, logout }}>
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