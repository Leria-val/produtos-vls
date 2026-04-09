import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createProduct, updateProduct, getProductById } from '../api/productService';

const ProductForm = () => {
  const { id } = useParams(); // Pega o ID da URL se existir
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: '', price: '', description: '' });
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      const loadProduct = async () => {
        try {
          const response = await getProductById(id);
          setProduct(response.data);
        } catch (error) {
          console.error("Erro ao carregar produto", error);
        }
      };
      loadProduct();
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateProduct(id, product);
      } else {
        await createProduct(product);
      }
      navigate('/dashboard');
    } catch (error) {
      alert("Erro ao salvar produto");
    }
  };

  return (
    <div>
      <h2>{isEdit ? 'Editar Produto' : 'Novo Produto'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input 
            type="text" 
            value={product.name} 
            onChange={e => setProduct({...product, name: e.target.value})} 
            required 
          />
        </div>
        <div>
          <label>Preço:</label>
          <input 
            type="number" 
            value={product.price} 
            onChange={e => setProduct({...product, price: e.target.value})} 
            required 
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea 
            value={product.description} 
            onChange={e => setProduct({...product, description: e.target.value})} 
          />
        </div>
        <button type="submit">{isEdit ? 'Atualizar' : 'Cadastrar'}</button>
        <button type="button" onClick={() => navigate('/dashboard')}>Cancelar</button>
      </form>
    </div>
  );
};

export default ProductForm;