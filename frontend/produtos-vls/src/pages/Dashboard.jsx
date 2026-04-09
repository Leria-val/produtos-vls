import { useEffect, useState, useContext } from 'react';
import { getProducts, deleteProduct } from '../api/productService';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const loadProducts = async () => {
    try {
      const response = await getProducts();
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
      await deleteProduct(id);
      loadProducts(); // Recarrega a lista
    }
  };

  if (loading) return <p>Carregando produtos...</p>;

  return (
    <div>
      <h1>Listagem de Produtos</h1>
      <table>
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
              <td>R$ {p.price}</td>
              <td>
                {/* Apenas Admin pode ver os botões de ação */}
                {user?.role === 'admin' ? (
                  <>
                    <Link to={`/products/edit/${p.id}`}><button>Editar</button></Link>
                    <button onClick={() => handleDelete(p.id)} style={{color: 'red'}}>Excluir</button>
                  </>
                ) : (
                  <span>Somente leitura</span>
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