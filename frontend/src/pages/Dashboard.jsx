import { useEffect, useState, useContext } from 'react';
import productService from '../api/productService';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../App.css';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useContext(AuthContext); // Asumiendo que tienes logout

  const loadProducts = async () => {
    try {
      const response = await productService.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao carregar produtos");
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
        loadProducts();
      } catch (err) {
        alert("Erro ao excluir produto");
      }
    }
  };

  if (loading) return <div className="home-container"><p>Carregando produtos...</p></div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Catálogo de Produtos</h1>
          <span className="role-badge">Logado como: {user?.role}</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {user?.role === 'admin' && (
            <Link to="/products/new">
              <button className="btn-primary">+ Novo Produto</button>
            </Link>
          )}
        </div>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>R$ {parseFloat(p.price).toFixed(2)}</td>
              <td>
                {user?.role === 'admin' ? (
                  <>
                    <Link to={`/products/edit/${p.id}`}>
                      <button className="btn-edit">Editar</button>
                    </Link>
                    <button className="btn-delete" onClick={() => handleDelete(p.id)}>
                      Excluir
                    </button>
                  </>
                ) : (
                  <span style={{ color: '#999', fontSize: '0.9rem' }}>Visualização</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;