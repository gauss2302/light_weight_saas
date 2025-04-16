'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import type { User, AuthContextType, LoginCredentials } from '@/lib/types/auth';
import { tokenManager } from '../utils/tokenManager';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = tokenManager.getToken();
        if (!token || !tokenManager.isValidToken(token)) {
          tokenManager.removeToken();
          setLoading(false);
          return;
        }

        const { data } = await api.get('/auth/verify');
        if (data.user) {
          setUser(data.user);
        } else {
          tokenManager.removeToken();
          setUser(null);
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        tokenManager.removeToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    void verifyToken();
  }, []);

  const login = async ({
    email,
    password,
  }: LoginCredentials): Promise<boolean> => {
    try {
      const { data } = await api.post('/auth/login', { email, password });

      if (data.token && data.user) {
        tokenManager.setToken(data.token);
        setUser(data.user);
        await router.replace('/dashboard');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }): Promise<boolean> => {
    try {
      const { data: registerData } = await api.post('/auth/register', {
        username,
        email,
        password,
      });

      if (registerData.message === 'User registered successfully') {
        const { data: loginData } = await api.post('/auth/login', {
          email,
          password,
        });

        if (loginData.token && loginData.user) {
          tokenManager.setToken(loginData.token);
          setUser(loginData.user);
          await router.replace('/dashboard');
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      tokenManager.removeToken();
      setUser(null);
      await router.replace('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
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
