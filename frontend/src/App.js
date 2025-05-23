import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import AllProducts from './pages/AllProducts/AllProducts';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import CreateProduct from './pages/CreateProduct/CreateProduct';
import EditProduct from './pages/EditProduct/EditProduct';

function App() {
  return (
    <div
      style={{
        backgroundImage: "url('/1.jpg')",
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
      }}
    >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<AllProducts />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
