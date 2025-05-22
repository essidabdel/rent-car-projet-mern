import React, { useEffect, useState } from 'react';
import axios from '../../api';
import './AllProducts.css';
import { Link } from 'react-router-dom';

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filters, setFilters] = useState({
    keyword: '',
    category: '',
    minPrice: '',
    maxPrice: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/products'); // backend retourne un tableau simple
        setAllProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Erreur API', err);
        setAllProducts([]);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setCurrentPage(1); // reset page à chaque filtre
  };

  const filteredProducts = allProducts.filter(p => {
    const keywordMatch = p.name?.toLowerCase().includes(filters.keyword.toLowerCase());
    const categoryMatch = p.category?.toLowerCase().includes(filters.category.toLowerCase());
    const price = parseFloat(p.price);
    const min = filters.minPrice ? parseFloat(filters.minPrice) : 0;
    const max = filters.maxPrice ? parseFloat(filters.maxPrice) : Infinity;
    const priceMatch = price >= min && price <= max;

    return keywordMatch && categoryMatch && priceMatch;
  });

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="all-products">
      <h2>Véhicules disponibles</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <input name="keyword" placeholder="Recherche" value={filters.keyword} onChange={handleChange} />
        <input name="category" placeholder="Catégorie" value={filters.category} onChange={handleChange} />
        <input name="minPrice" type="number" placeholder="Prix min" value={filters.minPrice} onChange={handleChange} />
        <input name="maxPrice" type="number" placeholder="Prix max" value={filters.maxPrice} onChange={handleChange} />
        <button disabled>Filtrer</button> {/* bouton inutile, filtres auto */}
      </form>

      <div className="product-list">
        {currentProducts.length > 0 ? (
          currentProducts.map(p => (
            <Link to={`/product/${p._id}`} key={p._id} className="product-card">
              <img src={p.photo} alt={p.name} />
              <h3>{p.name}</h3>
              <p>{p.price}€/jour</p>
              <p>Catégorie : {p.category}</p>
              <p>Propriétaire : {p.owner?.username}</p>
            </Link>
          ))
        ) : (
          <p>Aucun véhicule trouvé.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
            Précédent
          </button>
          <span>Page {currentPage} / {totalPages}</span>
          <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
            Suivant
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
