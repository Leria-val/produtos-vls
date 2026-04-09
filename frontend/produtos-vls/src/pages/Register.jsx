import { useState } from 'react';
import api from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      alert('Usuário criado com sucesso!');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao registrar');
    }
  };

  return (
    <div className="auth-form">
      <h2>Criar Conta</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" onChange={e => setFormData({...formData, name: e.target.value})} required />
        <input type="email" placeholder="E-mail" onChange={e => setFormData({...formData, email: e.target.value})} required />
        <input type="password" placeholder="Senha" onChange={e => setFormData({...formData, password: e.target.value})} required />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;