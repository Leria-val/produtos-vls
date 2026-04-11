import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(email, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login do Sistema</h2>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <input 
            className="auth-input"
            type="email" 
            placeholder="E-mail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            className="auth-input"
            type="password" 
            placeholder="Senha" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          
          {error && <div className="error-message">{error}</div>}
          
          <button className="btn-primary" type="submit">
            Entrar
          </button>
        </form>

        <button className="btn-link" onClick={() => navigate('/')}>
          ← Voltar para o Início
        </button>
      </div>
    </div>
  );
};

export default Login;