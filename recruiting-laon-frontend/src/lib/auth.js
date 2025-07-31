import api, { csrfClient, getCsrfTokenFromCookie } from './api';

export const authService = {
  async getCsrfToken() {
    try {
      await csrfClient.get('/sanctum/csrf-cookie');

      let attempts = 0;
      while (attempts < 5) {
        await new Promise(resolve => setTimeout(resolve, 200));
        const csrfToken = getCsrfTokenFromCookie();
        if (csrfToken) {
          return csrfToken;
        }
        attempts++;
      }
      
      throw new Error('CSRF token não foi definido após múltiplas tentativas');
    } catch (error) {
      throw error;
    }
  },

  // Login
  async login(credentials) {
    try {

      await this.getCsrfToken();
      
      const response = await api.post('/auth/login', credentials);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Definir cookie para o middleware
        document.cookie = `token=${response.data.token}; path=/; max-age=86400; SameSite=Lax`;
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Registro
  async register(userData) {
    try {
      await this.getCsrfToken();

      const response = await api.post('/auth/register', userData);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        document.cookie = `token=${response.data.token}; path=/; max-age=86400; SameSite=Lax`;
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout
  async logout() {
    try {
      await api.post('/auth/logout');

      await this.getCsrfToken(); 
    } catch (error) {
      throw error;
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  },

  // Obter usuário atual
  async getCurrentUser() {
    const response = await api.get('/auth/user');
    return response.data;
  },

  // Verificar se está autenticado
  isAuthenticated() {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('token');
  },

  // Obter usuário do localStorage
  getUser() {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};