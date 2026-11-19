import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-card">
        <span className="notfound-emoji">🐡</span>
        <h1 className="notfound-code">404</h1>
        <h2>Looking for something in the deep reef?</h2>
        <p>
          We're sorry. The Web address you entered is not a functioning page on our site.
        </p>
        <div className="notfound-links">
          <Link to="/" className="btn btn-primary">
            Go to AquaCart Home
          </Link>
          <Link to="/products" className="btn btn-secondary">
            Browse All Fish & Tanks
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
