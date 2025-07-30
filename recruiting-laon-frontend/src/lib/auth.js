import api, { csrfClient, getCsrfTokenFromCookie } from './api';

export const authService = {
  // Obter CSRF token e aguardar que seja definido
  async getCsrfToken() {
    try {
      console.log('Obtendo CSRF token...');
      await csrfClient.get('/sanctum/csrf-cookie');
      
      // Aguardar até que o cookie seja definido (máximo 5 tentativas)
      let attempts = 0;
      while (attempts < 5) {
        await new Promise(resolve => setTimeout(resolve, 200));
        const csrfToken = getCsrfTokenFromCookie();
        if (csrfToken) {
          console.log('CSRF token obtido com sucesso');
          return csrfToken;
        }
        attempts++;
      }
      
      throw new Error('CSRF token não foi definido após múltiplas tentativas');
    } catch (error) {
      console.error('Erro ao obter CSRF token:', error);
      throw error;
    }
  },

  // Login
  async login(credentials) {
    try {
      // Obter CSRF token e aguardar que seja definido
      await this.getCsrfToken();
      
      const response = await api.post('/auth/login', credentials);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Definir cookie para o middleware
        document.cookie = `token=${response.data.token}; path=/; max-age=86400; SameSite=Lax`;
      }
      
      console.log('Login realizado com sucesso');
      return response.data;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  },

  // Registro
  async register(userData) {
    try {
      // Obter CSRF token e aguardar que seja definido
      await this.getCsrfToken();
      
      console.log('Fazendo registro...');
      const response = await api.post('/auth/register', userData);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        document.cookie = `token=${response.data.token}; path=/; max-age=86400; SameSite=Lax`;
      }
      
      console.log('Registro realizado com sucesso');
      return response.data;
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    }
  },

  // Logout
  async logout() {
    try {
      console.log('Fazendo logout...');
      await api.post('/auth/logout');
      console.log('Logout realizado com sucesso no servidor');
    } catch (error) {
      console.error('Erro no logout no servidor:', error);
      // Mesmo com erro no servidor, limpar dados locais
    } finally {
      // Sempre limpar dados locais
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      console.log('Dados locais limpos');
    }
  },

  // Logout de todos os dispositivos
  async logoutAll() {
    try {
      console.log('Fazendo logout de todos os dispositivos...');
      await api.post('/auth/logout-all');
      console.log('Logout de todos os dispositivos realizado com sucesso');
    } catch (error) {
      console.error('Erro no logout geral no servidor:', error);
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