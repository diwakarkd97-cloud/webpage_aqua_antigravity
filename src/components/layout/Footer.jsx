import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand info */}
          <div className="footer-brand">
            <h3>🐠 AquaCart.in</h3>
            <p>
              India's premier online destination for aquascaping, high-grade live ornamental fish, rimless tanks, and advanced aquarium filtration equipment.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Shop</h4>
            <ul>
              <li><Link to="/products?category=Live Fish">Live Fish</Link></li>
              <li><Link to="/products?category=Tanks">Rimless Glass Tanks</Link></li>
              <li><Link to="/products?category=Filters">Canister Filters</Link></li>
              <li><Link to="/products?category=Food">Fish Food</Link></li>
              <li><Link to="/products?category=Decor">Plants & Hardscape</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><Link to="/checkout">Live Arrival Guarantee</Link></li>
              <li><Link to="/cart">Shipping & Delivery Rates</Link></li>
              <li><Link to="/checkout">Track Your Order</Link></li>
              <li><Link to="/products">Aquarium Setup Guides</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-col">
            <h4>AquaCart</h4>
            <ul>
              <li><Link to="/products">About Our Labs</Link></li>
              <li><Link to="/products">Breeder Certification</Link></li>
              <li><Link to="/products">Privacy Policy</Link></li>
              <li><Link to="/products">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 AquaCart Technologies Private Limited. All rights reserved.</p>
          <p>Designed for passionate aquarists across India 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
