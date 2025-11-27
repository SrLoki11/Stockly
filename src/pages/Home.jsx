// Home.jsx

import React, { useState, useMemo } from 'react';
import ProductFormModal from './ProductFormModal'; 
import './Home.css'; 


const initialInventory = [
  { id: 1, name: 'Pequeno Príncipe', code: '12345', category: 'Livros', quantity: 20, price: 30, status: 'Em estoque' },
  { id: 2, name: 'A Arte da Guerra', code: '56788', category: 'Roupas', quantity: 50, price: 70, status: 'Em estoque' },
  { id: 3, name: 'Uma breve história do tempo', code: '69847', category: 'Calçados', quantity: 15, price: 230, status: 'Estoque Baixo' },
  { id: 4, name: 'Além do bem e do mal', code: '91011', category: 'Acessórios', quantity: 0, price: 25, status: 'Esgotado' },
];


const StatusPill = ({ status }) => {
  const statusClass = status.toLowerCase().replace(' ', '-');
  return (
    <span className={`status-pill ${statusClass}`}>{status}</span>
  );
};

const Home = () => {
  const [inventory, setInventory] = useState(initialInventory);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [searchTerm, setSearchTerm] = useState('');
  
  
  const filteredInventory = useMemo(() => {
    if (!searchTerm) return inventory;
    const lowerCaseSearch = searchTerm.toLowerCase();

    return inventory.filter(item => 
      item.name.toLowerCase().includes(lowerCaseSearch) ||
      item.code.includes(lowerCaseSearch) ||
      item.category.toLowerCase().includes(lowerCaseSearch)
    );
  }, [inventory, searchTerm]);

  
  const handleAddProduct = (newProduct) => {
    const newId = Math.max(...inventory.map(item => item.id), 0) + 1;
    setInventory(prev => [
      ...prev, 
      { 
        ...newProduct, 
        id: newId, 
        
        status: newProduct.quantity > 0 ? 'Em estoque' : 'Esgotado'
      }
    ]);
    setIsModalOpen(false); 
  };
  
  // Função para Deletar Produto
  const handleDeleteProduct = (id) => {
    setInventory(prev => prev.filter(item => item.id !== id));
  }


  return (
    <div className="inventory-page">
      
      <header className="page-header">
        <h1 className="logo">Stockly</h1>
        <button className="logout-button" title="Sair">
          &#8594; {/* Seta para a direita */}
        </button>
      </header>

      
      <h2 className="inventory-title">
        {inventory.length} Produtos Cadastrados
      </h2>

      
      <div className="action-bar-tabs">
        <div className="search-and-tabs">
          <input 
            type="text" 
            placeholder="Digite o nome do produto ou o código" 
            className="search-input-mockup"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="tab-buttons">
            <button className="tab-button active">Produtos</button>
            <button className="tab-button">Histórico de Movimentações</button>
          </div>
        </div>
        
        <button 
          className="main-action-button"
          onClick={() => setIsModalOpen(true)}
        >
          Cadastrar Produto
        </button>
      </div>

      
      <div className="inventory-table-container">
        <table>
          <thead>
            <tr>
              <th className="column-name">Nome</th>
              <th>Código</th>
              <th>Categoria</th>
              <th>Quantidade</th>
              <th>Preço</th>
              <th>Status</th>
              <th className="column-actions">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map(item => (
              <tr key={item.id}>
                <td className="column-name">{item.name}</td>
                <td>{item.code}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>R$ {item.price.toFixed(2).replace('.', ',')}</td>
                <td>
                  <StatusPill status={item.status} />
                </td>
                <td className="column-actions">
                  <div className="action-icons">
                    
                    <button className="icon-button" title="Vender/Saída">🛒</button>
                    <button className="icon-button" title="Adicionar Estoque">➕</button>
                    <button className="icon-button" title="Editar">✏️</button>
                    <button 
                      className="icon-button delete-btn" 
                      title="Excluir"
                      onClick={() => handleDeleteProduct(item.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredInventory.length === 0 && (
              <tr>
                <td colSpan="7" className="no-results">Nenhum produto encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Modal de Cadastro */}
      {isModalOpen && (
        <ProductFormModal 
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddProduct}
        />
      )}
    </div>
  );
};

export default Home;