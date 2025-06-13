import { httpClient } from './httpClient';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  phone?: string;
}

export const userService = {
  /**
   * Busca o perfil do usuário autenticado
   */
  getUserProfile: async (): Promise<User> => {
    const { data } = await httpClient.get('/users/me');
    return data;
  },

  /**
   * Atualiza o perfil do usuário
   */
  updateUserProfile: async (userData: UpdateUserData): Promise<User> => {
    const { data } = await httpClient.put('/users/me', userData);
    return data;
  },

  /**
   * Busca usuário por ID
   */
  getUserById: async (id: string): Promise<User> => {
    const { data } = await httpClient.get(`/users/${id}`);
    return data;
  },

  /**
   * Lista todos os usuários (admin)
   */
  getUsers: async (): Promise<User[]> => {
    const { data } = await httpClient.get('/users');
    return data;
  },

  /**
   * Cria novo usuário (admin)
   */
  createUser: async (userData: CreateUserData): Promise<User> => {
    const { data } = await httpClient.post('/users', userData);
    return data;
  },

  /**
   * Deleta usuário (admin)
   */
  deleteUser: async (id: string): Promise<void> => {
    await httpClient.delete(`/users/${id}`);
  },
};