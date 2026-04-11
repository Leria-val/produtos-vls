import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Carregando...</div>;

  // Se não houver usuário logado, manda para o Login
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;