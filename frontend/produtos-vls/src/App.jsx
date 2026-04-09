import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Importação dos seus componentes
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Layout from './components/Layout';

// Importação das suas páginas
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProductForm from './pages/ProductForm';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* Rotas Privadas (Qualquer usuário logado) */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Rotas de Admin (Apenas admin) */}
              <Route element={<AdminRoute />}>
                <Route path="/products/new" element={<ProductForm />} />
                <Route path="/products/edit/:id" element={<ProductForm />} />
              </Route>
            </Route>
          </Route>

          {/* Rota 404 - Opcional */}
          <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;