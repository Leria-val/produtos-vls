import { createContext, useState, useEffect } from 'react';
import api from '../api/axiosConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al cargar la app, verificamos si ya existe un token guardado
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Llamamos al authController.login del backend
      const response = await api.post('/auth/login', { email, password });
      
      const { token, user: userData } = response.data;

      // Guardamos en localStorage para persistencia
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      // Actualizamos el estado global
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error("Erro no login:", error.response?.data?.message || error.message);
      return { 
        success: false, 
        message: error.response?.data?.message || "Erro ao conectar ao servidor" 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      authenticated: !!user, 
      loading,
      isAdmin: user?.role === 'admin' // Helper para verificar admin fácil
    }}>
      {children}
    </AuthContext.Provider>
  );
};