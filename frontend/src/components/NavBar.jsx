import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', background: '#222', color: '#fff', padding: '1rem' }}>
      <div>
        <Link to="/dashboard" style={{ color: '#fff', marginRight: '15px' }}>Dashboard</Link>
        {user?.role === 'admin' && (
          <Link to="/products/new" style={{ color: '#gold' }}>+ Novo Produto (Admin)</Link>
        )}
      </div>
      <div>
        <span>Olá, {user?.name} ({user?.role})</span>
        <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Sair</button>
      </div>
    </nav>
  );
};

export default NavBar;