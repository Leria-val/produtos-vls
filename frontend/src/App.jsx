import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// componentes
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Layout from './components/Layout';

// páginas
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProductForm from './pages/ProductForm';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* home */}
          <Route path="/" element={<Home />} />
          
          {/* rotas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rotas Privadas */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              
              <Route element={<AdminRoute />}>
                <Route path="/products/new" element={<ProductForm />} />
                <Route path="/products/edit/:id" element={<ProductForm />} />
              </Route>
            </Route>
          </Route>

          {/*se o usuario escreve rotas inexistentes, vai p Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;