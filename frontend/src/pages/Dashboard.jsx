import { useEffect, useState, useContext } from 'react';
import productService from '../api/productService';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../App.css';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useContext(AuthContext);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAll();
      
      const actualData = response.data || response; 
      
      setProducts(Array.isArray(actualData) ? actualData : []);
    } catch (error) {
      console.error("Erro ao carregar produtos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir este produto?")) {
      try {
        await productService.delete(id);
        // Recargar la lista tras eliminar
        loadProducts();
      } catch (err) {
        console.error("Erro ao excluir:", err.response);
        const errorMsg = err.response?.data?.error || err.response?.data?.message || "Sem permissão";
        alert(errorMsg);
      }
    }
  };

  if (loading) return <div className="home-container"><p>Carregando produtos...</p></div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Catálogo de Produtos</h1>
          <span className="role-badge" style={{ 
            background: user?.role === 'admin' ? '#d4edda' : '#eee',
            padding: '5px 10px',
            borderRadius: '4px',
            fontSize: '0.8rem'
          }}>
            Logado como: <strong>{user?.role}</strong>
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {user?.role === 'admin' && (
            <Link to="/products/new">
              <button className="btn-primary">+ Novo Produto</button>
            </Link>
          )}
          <button onClick={logout} className="btn-secondary">Sair</button>
        </div>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>
                  <span className="category-badge">
                    {p.category ? p.category.name : 'Sem categoria'}
                  </span>
                </td>
                <td>R$ {parseFloat(p.price || 0).toFixed(2)}</td>
                <td>
                  {user?.role === 'admin' ? (
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <Link to={`/products/edit/${p.id}`}>
                        <button className="btn-edit">Editar</button>
                      </Link>
                      <button className="btn-delete" onClick={() => handleDelete(p.id)}>
                        Excluir
                      </button>
                    </div>
                  ) : (
                    <span style={{ color: '#999', fontSize: '0.9rem' }}>Apenas leitura</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                Nenhum produto encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;