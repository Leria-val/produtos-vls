import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">Produtos VLS</h1>
        <p className="home-subtitle">Uma plataforma para gestão de produtos.</p>
        
        <div className="button-group">
          <button className="btn-primary" onClick={() => navigate('/login')}>
            Fazer Login
          </button>
          <button className="btn-secondary" onClick={() => navigate('/register')}>
            Criar Nova Conta
          </button>
        </div>
        
        <div className="info-card">
          <h3>Dica para teste:</h3>
          <div className="test-info">
            <p><strong>Admin:</strong> admin@test.com | 123456</p>
            <p><strong>User:</strong> user@test.com | 123456</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;