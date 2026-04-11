import { useState } from 'react';
import api from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/register', formData);
      // Cambiamos el alert por algo más elegante si quieres, pero por ahora cumple
      alert('Usuário criado com sucesso!');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao registrar');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Criar Conta</h2>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <input 
            className="auth-input"
            type="text" 
            placeholder="Nome Completo" 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            required 
          />
          <input 
            className="auth-input"
            type="email" 
            placeholder="E-mail" 
            onChange={e => setFormData({...formData, email: e.target.value})} 
            required 
          />
          <input 
            className="auth-input"
            type="password" 
            placeholder="Senha" 
            onChange={e => setFormData({...formData, password: e.target.value})} 
            required 
          />
          
          {error && <div className="error-message">{error}</div>}
          
          <button className="btn-primary" type="submit">
            Registrar
          </button>
        </form>

        <button className="btn-link" onClick={() => navigate('/login')}>
          Já tem uma conta? Faça Login
        </button>
      </div>
    </div>
  );
};

export default Register;