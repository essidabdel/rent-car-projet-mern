import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Erreur lors du chargement du produit');
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Chargement...</p>;

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <img src={product.photo} alt={product.name} />
      <p>{product.description}</p>
      <p><strong>Prix :</strong> {product.price} € / jour</p>
      <p><strong>Catégorie :</strong> {product.category}</p>
      <p><strong>Propriétaire :</strong> {product.owner?.username}</p>
    </div>
  );
};

export default ProductDetails;
