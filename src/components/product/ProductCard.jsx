import React from 'react';
import { Link } from 'react-router-dom';
import { formatINR } from '../../utils/currencyFormatter';
import { calculateDiscount } from '../../utils/calculateDiscount';
import { useCart } from '../../context/CartContext';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const discount = calculateDiscount(product.price, product.originalPrice);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Thumbnail Box */}
        <div className="card-image-box">
          <img src={product.images[0]} alt={product.title} loading="lazy" />
          {product.isBestseller && (
            <span className="card-badge-tag">Bestseller</span>
          )}
          {product.category === 'Live Fish' && (
            <span className="card-badge-tag card-badge-live" style={{ left: 'auto', right: '10px' }}>
              Live Fish
            </span>
          )}
        </div>

        {/* Card Body */}
        <div className="card-body">
          <span className="card-category-sub">{product.category} • {product.subCategory}</span>
          <h3 className="card-title" title={product.title}>
            {product.title}
          </h3>

          {/* Rating */}
          <div className="rating-pill">
            <span className="rating-stars">★ {product.rating}</span>
            <span className="rating-count">({product.reviewsCount})</span>
          </div>

          {/* Price Block */}
          <div className="card-pricing-row">
            <span className="card-price-current">{formatINR(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="card-price-original">{formatINR(product.originalPrice)}</span>
            )}
            {discount > 0 && (
              <span className="card-discount-tag">{discount}% OFF</span>
            )}
          </div>
        </div>
      </Link>

      {/* Quick Add CTA */}
      <div style={{ padding: '0 16px 16px 16px' }}>
        <button
          type="button"
          className="btn btn-secondary btn-sm btn-block"
          onClick={handleQuickAdd}
          disabled={product.stock <= 0}
        >
          {product.stock > 0 ? '+ Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
