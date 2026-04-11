import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Carregando...</div>;

  // Verifica se o role é exatamente 'admin'
  return user && user.role === 'admin' ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default AdminRoute;