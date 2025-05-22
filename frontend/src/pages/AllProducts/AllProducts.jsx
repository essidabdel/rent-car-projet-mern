import React, { useEffect, useState, useCallback } from 'react';
import axios from '../../api';
import './AllProducts.css';
import { Link } from 'react-router-dom';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    keyword: '',
    category: '',
    minPrice: '',
    maxPrice: ''
  });

  const fetchProducts = useCallback(async () => {
    const params = {};
    if (filters.keyword) params.keyword = filters.keyword;
    if (filters.category) params.category = filters.category;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;

    const res = await axios.get('/products', { params });
    setProducts(res.data);
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div className="all-products">
      <h2>Véhicules disponibles</h2>

      <form onSubmit={handleSearch}>
        <input name="keyword" placeholder="Recherche" onChange={handleChange} />
        <input name="category" placeholder="Catégorie" onChange={handleChange} />
        <input name="minPrice" type="number" placeholder="Prix min" onChange={handleChange} />
        <input name="maxPrice" type="number" placeholder="Prix max" onChange={handleChange} />
        <button type="submit">Filtrer</button>
      </form>

      <div className="product-list">
        {products.map(p => (
          <Link to={`/product/${p._id}`} key={p._id} className="product-card">
            <img src={p.photo} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.price}€/jour</p>
            <p>Catégorie : {p.category}</p>
            <p>Propriétaire : {p.owner?.username}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
