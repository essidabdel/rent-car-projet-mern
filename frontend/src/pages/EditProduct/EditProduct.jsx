import React, { useState, useEffect } from 'react';
import axios from '../../api';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const [form, setForm] = useState({
    name: '', description: '', price: '', category: '', photo: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${id}`);
        setForm({
          name: res.data.name || '',
          description: res.data.description || '',
          price: res.data.price || '',
          category: res.data.category || '',
          photo: res.data.photo || ''
        });
      } catch (err) {
        alert('Erreur lors du chargement');
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/products/${id}`, form);
      navigate('/dashboard');
    } catch (err) {
      alert('Erreur lors de la modification');
    }
  };

  return (
    <div className="register">
      <h2>Modifier le véhicule</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nom" value={form.name} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="price" placeholder="Prix" type="number" value={form.price} onChange={handleChange} required />
        <input name="category" placeholder="Catégorie" value={form.category} onChange={handleChange} required />
        <input name="photo" placeholder="URL image" value={form.photo} onChange={handleChange} />
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default EditProduct;
