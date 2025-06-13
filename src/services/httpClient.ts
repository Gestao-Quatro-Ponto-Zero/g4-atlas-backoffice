import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Configuração centralizada do cliente HTTP
const createHttpClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor - adicionar token de autenticação
  client.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = localStorage.getItem('authToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor - tratamento global de erros
  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Token inválido ou expirado
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
      
      if (error.response?.status >= 500) {
        console.error('Erro interno do servidor:', error);
      }
      
      return Promise.reject(error);
    }
  );

  return client;
};

export const httpClient = createHttpClient();