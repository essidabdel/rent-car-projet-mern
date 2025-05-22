import React, { useEffect, useState } from 'react';
import axios from '../../api';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchMyProducts = async () => {
    const res = await axios.get('/products/user');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`/products/${id}`);
    fetchMyProducts();
  };

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleAdd = () => {
    navigate('/create-product');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Mes véhicules</h2>
        <button className="add-vehicule-btn" onClick={handleAdd}>Ajouter un véhicule</button>
      </div>
      <ul>
        {products.map(p => (
          <li key={p._id}>
            <strong>{p.name}</strong>
            <span className="dashboard-price">{p.price}€/j</span>
            <div>
              <button onClick={() => handleEdit(p._id)} className="edit-btn">Modifier</button>
              <button onClick={() => handleDelete(p._id)}>Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
