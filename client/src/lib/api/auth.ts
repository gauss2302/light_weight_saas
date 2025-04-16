import api from './index';
import { AuthResponse, User } from '@/lib/types/auth';

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post<AuthResponse>('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  register: async (username: string, email: string, password: string) => {
    const response = await api.post('/auth/register', {
      username,
      email,
      password,
    });
    return response.data;
  },

  verify: async () => {
    const response = await api.get<{ user: User }>('/auth/verify');
    return response.data;
  },
};
