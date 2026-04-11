import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import productService from '../api/productService';
import api from '../api/axiosConfig'; 
import '../App.css';

const ProductForm = () => {
  const { id } = useParams(); // Pega o ID da URL se existir
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: '', price: '', description: '', categoryId: 1 });
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      const loadProduct = async () => {
        try {
          const response = await productService.getById(id);
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
      // Preparamos los datos: Aseguramos que el precio sea número
      const dataToSend = { 
        ...product, 
        price: Number(product.price) 
      };

      if (isEdit) {
        await productService.update(id, dataToSend); // ¡Corregido a update!
      } else {
        await productService.create(dataToSend);
      }
      navigate('/dashboard');
    } catch (error) {
      console.error(error.response?.data);
      alert(error.response?.data?.message || "Erro ao salvar produto. Verifique se todos os campos estão corretos.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: '500px' }}>
        <h2>{isEdit ? 'Editar Produto' : 'Novo Produto'}</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div style={{ textAlign: 'left' }}>
            <label>Nome:</label>
            <input 
              className="auth-input"
              type="text" 
              value={product.name} 
              onChange={e => setProduct({...product, name: e.target.value})} 
              required 
            />
          </div>
          
          <div style={{ textAlign: 'left' }}>
            <label>Preço:</label>
            <input 
              className="auth-input"
              type="number" 
              step="0.01"
              value={product.price} 
              onChange={e => setProduct({...product, price: e.target.value})} 
              required 
            />
          </div>
          
          <div style={{ textAlign: 'left' }}>
            <label>Descrição:</label>
            <textarea 
              className="auth-input"
              style={{ minHeight: '80px', fontFamily: 'inherit' }}
              value={product.description} 
              onChange={e => setProduct({...product, description: e.target.value})} 
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button className="btn-primary" type="submit" style={{ flex: 1 }}>
              {isEdit ? 'Atualizar' : 'Cadastrar'}
            </button>
            <button className="btn-secondary" type="button" style={{ flex: 1 }} onClick={() => navigate('/dashboard')}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
