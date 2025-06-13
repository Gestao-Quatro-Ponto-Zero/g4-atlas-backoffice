import { httpClient } from './httpClient';
import { User } from './userService';

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
  expiresIn: number;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const authService = {
  /**
   * Realiza login do usuário
   */
  login: async (credentials: LoginData): Promise<AuthResponse> => {
    const { data } = await httpClient.post('/auth/login', credentials);
    return data;
  },

  /**
   * Registra novo usuário
   */
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const { data } = await httpClient.post('/auth/register', userData);
    return data;
  },

  /**
   * Realiza logout do usuário
   */
  logout: async (): Promise<void> => {
    await httpClient.post('/auth/logout');
  },

  /**
   * Renova token de acesso
   */
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const { data } = await httpClient.post('/auth/refresh', { refreshToken });
    return data;
  },

  /**
   * Solicita reset de senha
   */
  forgotPassword: async (email: string): Promise<void> => {
    await httpClient.post('/auth/forgot-password', { email });
  },

  /**
   * Reseta senha com token
   */
  resetPassword: async (token: string, password: string): Promise<void> => {
    await httpClient.post('/auth/reset-password', { token, password });
  },
};