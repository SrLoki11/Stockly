// ProductFormModal.jsx

import React, { useState } from 'react';
import './ProductFormModal.css'; // Crie um CSS para o modal

const ProductFormModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    category: '',
    quantity: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validação básica
    if (formData.name && formData.quantity && formData.price) {
        // Converte quantidade e preço para número
        const productData = {
            ...formData,
            quantity: Number(formData.quantity),
            price: Number(formData.price),
        };
        onSubmit(productData);
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Cadastrar Novo Produto</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="product-form">
          <label>Nome do Produto</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          
          <label>Código/ISBN</label>
          <input type="text" name="code" value={formData.code} onChange={handleChange} required />

          <label>Categoria</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} required />

          <label>Quantidade em Estoque</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required min="0" />

          <label>Preço (R$)</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" />

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-button">Cancelar</button>
            <button type="submit" className="submit-button">Salvar Produto</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;