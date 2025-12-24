import React from 'react';
import { FaShoppingCart, FaBell, FaUser } from 'react-icons/fa';

const Header = ({ onAuthClick }) => {
  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo">DEADSTOCK</div>
        
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#categories">Categories</a>
          <a href="#featured">Featured</a>
          <a href="#bidding">Bidding</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        
        <div className="header-actions">
          <div className="action-icons">
            <button className="icon-btn">
              <FaShoppingCart />
            </button>
            <button className="icon-btn">
              <FaBell />
            </button>
            <button className="icon-btn">
              <FaUser />
            </button>
          </div>
          <div className="auth-buttons">
            <button onClick={onAuthClick}>Login / Register</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;