import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Async function to fetch product details by ID
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:9000/product/${id}`);// Fetch product data from backend API
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();// Call the fetch function whenever the `id` changes
  }, [id]);
// Render loading message while fetching
  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <div className="product-details">
      <img src={product.image} alt={product.title} />

      <table className="details-table">
        <tbody>
          <tr>
            <th>Offer</th>
            <td>{product.description}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{product.detailedDescription}</td>
          </tr>
          <tr>
            <th>Category</th>
            <td>{product.category}</td>
          </tr>
          <tr>
            <th>Price Range</th>
            <td>{product.priceRange}</td>
          </tr>
          <tr>
            <th>Rating</th>
            <td>{product.rating}</td>
          </tr>
          <tr>
            <th>Available</th>
            <td>{product.available ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <th>Valid Until</th>
            <td>{new Date(product.validUntil).toLocaleDateString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetails;
