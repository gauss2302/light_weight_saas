import { jwtDecode } from 'jwt-decode';
import api from '@/lib/api';

interface TokenPayload {
  exp: number;
  userId: string;
}

export const tokenManager = {
  setToken(token: string): void {
    if (!this.isValidToken(token)) {
      throw new Error('Invalid token format');
    }

    document.cookie = `auth_token=${token}; path=/; max-age=86400; samesite=strict`;
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  removeToken(): void {
    document.cookie =
      'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  isValidToken(token: string): boolean {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded.exp * 1000 > Date.now();
    } catch (error) {
      console.error('Token validation failed:', error);
      return false;
    }
  },

  setupApiToken(): void {
    const token = this.getToken();
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  },
};
