import React from 'react';
import { ProductCard } from './ProductCard';

export const ProductGrid = ({ products = [] }) => {
  if (!products || products.length === 0) {
    return (
      <div className="empty-state-card" style={{ gridColumn: '1 / -1' }}>
        <div className="empty-state-icon">🔍</div>
        <h2>No aquatic products found</h2>
        <p>Try clearing filters or adjusting your search keyword.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
