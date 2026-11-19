import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFilters } from '../../context/FilterContext';

export const Navbar = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { setSearchQuery } = useFilters();
  const [searchInput, setSearchInput] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput.trim());
      navigate(`/products?search=${encodeURIComponent(searchInput.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Value Banner */}
      <div className="announcement-bar">
        <span>🌊 100% Live Arrival Guarantee Across India</span>
        <span>•</span>
        <span>Free Express Delivery on orders above ₹1,500</span>
      </div>

      {/* Main Header */}
      <header className="header-sticky">
        <div className="navbar">
          {/* Logo */}
          <Link to="/" className="nav-brand" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="nav-brand-logo-icon">🐠</span>
            <span>Aqua<span className="brand-accent">Cart</span></span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="nav-links-desktop">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Home
            </NavLink>
            <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              All Products
            </NavLink>
            <NavLink to="/products?category=Live Fish" className="nav-link">
              Live Fish
            </NavLink>
            <NavLink to="/products?category=Tanks" className="nav-link">
              Tanks
            </NavLink>
            <NavLink to="/products?category=Food" className="nav-link">
              Food & Care
            </NavLink>
          </nav>

          {/* Search Pill */}
          <form className="nav-search-bar" onSubmit={handleSearchSubmit}>
            <span className="nav-search-icon">🔍</span>
            <input
              type="text"
              className="nav-search-input"
              placeholder="Search betta, cichlid, optiwhite tank..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </form>

          {/* Right Action: Cart Pill & Mobile Hamburger */}
          <div className="nav-actions">
            <Link to="/cart" className="cart-pill-btn" aria-label="Shopping Cart">
              <span>🛒</span>
              <span className="cart-pill-text">Cart</span>
              <span className="cart-badge">{cartCount}</span>
            </Link>

            <button
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="mobile-nav-drawer">
            <form onSubmit={handleSearchSubmit} style={{ marginBottom: '14px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search aquatic store..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </form>
            <div className="mobile-nav-links">
              <Link to="/" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link to="/products" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                All Products
              </Link>
              <Link to="/products?category=Live Fish" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                🐠 Live Tropical & Marine Fish
              </Link>
              <Link to="/products?category=Tanks" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                📦 Rimless Aquarium Tanks
              </Link>
              <Link to="/products?category=Filters" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                ⚙️ Canister Filters & Equipment
              </Link>
              <Link to="/products?category=Food" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                🥣 Premium Fish Nutrition
              </Link>
              <Link to="/cart" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                🛒 My Cart ({cartCount} items)
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
