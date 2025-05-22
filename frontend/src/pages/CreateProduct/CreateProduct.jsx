import React, { useState } from 'react';
import axios from '../../api';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const [form, setForm] = useState({
    name: '', description: '', price: '', category: '', photo: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/products', form);
      navigate('/dashboard');
    } catch (err) {
      alert('Erreur lors de la création');
    }
  };

  return (
    <div className="register">
      <h2>Ajouter un véhicule</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nom" value={form.name} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="price" placeholder="Prix" type="number" value={form.price} onChange={handleChange} required />
        <input name="category" placeholder="Catégorie" value={form.category} onChange={handleChange} required />
        <input name="photo" placeholder="URL image" value={form.photo} onChange={handleChange} />
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default CreateProduct;
