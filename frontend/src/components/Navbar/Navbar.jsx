import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">Accueil</Link>
        {token && <Link to="/dashboard">Dashboard</Link>}
      </div>
      <div className="navbar-right">
        {token ? (
          <button onClick={handleLogout}>Se déconnecter</button>
        ) : (
          <>
            <Link to="/login">Connexion</Link>
            <Link to="/register">Créer un compte</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
