import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import Leads from './components/leads/Leads';
import Analytics from './components/analytics/Analytics';
import Reports from './components/reports/Reports';
import CreateAdd from './components/createAdd/CreateAdd';
import ProductDetails from './components/productDetails/ProductDetails';
import './App.css';

// Main App component that sets up routing and layout
const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Sidebar component with navigation links */}
        <Sidebar />
        {/* Define routes for different pages */}
        <Routes>
          {/* Default route rendering the Dashboard */}
          <Route path="/" element={<Dashboard />} />
          {/* Route for Leads page */}
          <Route path="/leads" element={<Leads />} />
          {/* Route for Analytics page */}
          <Route path="/analytics" element={<Analytics />} />
          {/* Route for Reports page */}
          <Route path="/reports" element={<Reports />} />
          {/* Route for Create Add page */}
          <Route path="/create-Add" element={<CreateAdd/>} />
          <Route path="/product/:id" element={<ProductDetails />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
