import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Define an async function to fetch data from the server
    const fetchData = async () => {
      try {
        // Make the HTTP GET request to the backend API
        const response = await fetch(`http://localhost:9000/product/dashboard/all`);
        const data = await response.json();
        setProducts(data);       // Update the state with the fetched product data
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData(); //Call the fetchData function once when component mounts
  }, []);

  return (
    <div className="dashboard-wrapper">
      {/* Header section */}
      <header className="dashboard-header">
        <h1>ADsite</h1>
        <p>Digital Ads for Modern Market</p>
      </header>

      {/* Ads section */}
      <section className="ad-section">
        <h2>FEATURE ADS</h2>
        <div className="ad-grid">
          {loading ? (
            <p>Loading ads...</p>
          ) : products.length === 0 ? (
            <p>No ads found.</p>
          ) : (
            products.map(ad => (
              <div className="ad-card" key={ad._id}>
                <img src={ad.image} alt={ad.title} />
                <div className="ad-content">
                  <h3>{ad.title}</h3>
                  <p>{ad.description}</p>
      <button
        className="ad-btn"
        onClick={() => navigate(`/product/${ad._id}`)}
      >
        Learn More
      </button>

                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
