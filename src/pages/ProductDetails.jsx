import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import productsData from '../data/mockDatabase';
import { VolumeCalculator } from '../components/product/VolumeCalculator';
import { formatINR } from '../utils/currencyFormatter';
import { calculateDiscount } from '../utils/calculateDiscount';
import { checkFishCompatibility } from '../utils/domHelpers';
import { useCart } from '../context/CartContext';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = productsData.find((p) => p.id === id) || productsData[0];
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  useEffect(() => {
    if (product?.images?.length) {
      setSelectedImage(product.images[0]);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const discount = calculateDiscount(product.price, product.originalPrice);
  const { isAggressive, warningMessage } = checkFishCompatibility(product);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="page-wrapper">
      {/* Breadcrumbs */}
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <Link to="/products">Products</Link>
        <span>›</span>
        <Link to={`/products?category=${encodeURIComponent(product.category)}`}>{product.category}</Link>
        <span>›</span>
        <span className="breadcrumbs-current">{product.title}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="pdp-grid">
        {/* Gallery */}
        <div className="pdp-gallery">
          <div className="pdp-main-image-box">
            <img src={selectedImage} alt={product.title} />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="pdp-thumbs-row">
              {product.images.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className={`pdp-thumb-item ${selectedImage === imgUrl ? 'thumb-active' : ''}`}
                  onClick={() => setSelectedImage(imgUrl)}
                >
                  <img src={imgUrl} alt={`${product.title} thumbnail ${idx + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="pdp-info">
          <span className="pdp-category-badge">{product.category} • {product.brand || 'AquaCart'}</span>
          <h1 className="pdp-title">{product.title}</h1>

          <div className="pdp-ratings-line">
            <div className="rating-pill">
              <span className="rating-stars">★ {product.rating}</span>
              <span className="rating-count">({product.reviewsCount} customer reviews)</span>
            </div>
            <span>•</span>
            <span style={{ fontSize: '13px', color: product.stock > 0 ? '#10b981' : '#ef4444', fontWeight: 600 }}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Currently Out of Stock'}
            </span>
          </div>

          {/* Price Block */}
          <div className="pdp-pricing-block">
            <span className="pdp-current-price">{formatINR(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="pdp-original-price">{formatINR(product.originalPrice)}</span>
            )}
            {discount > 0 && (
              <span className="card-discount-tag">{discount}% OFF</span>
            )}
          </div>

          {/* Live Arrival Guarantee Trust Badge */}
          {product.category === 'Live Fish' && (
            <div className="badge-trust-guarantee">
              <span className="trust-badge-icon">🐟</span>
              <div className="trust-badge-text">
                <strong>100% Live Arrival Guarantee</strong>
                <p>Packed in temperature-controlled oxygen bags. Delivered in 24 hours.</p>
              </div>
            </div>
          )}

          {/* Fish Compatibility Warning */}
          {warningMessage && (
            <div className={`alert-box ${isAggressive ? 'alert-warning' : 'alert-success'}`}>
              <span>{isAggressive ? '⚠️' : '✅'}</span>
              <div>
                <strong>{warningMessage}</strong>
                {isAggressive && (
                  <p style={{ marginTop: '2px', fontSize: '12px' }}>
                    Temperament: <strong>{product.temperament}</strong>. Suitable for biotope or dedicated cichlid tanks.
                  </p>
                )}
              </div>
            </div>
          )}

          <p className="pdp-description">{product.description}</p>

          {/* Tank Volume Calculator (for Tanks category) */}
          {product.category === 'Tanks' && (
            <div style={{ marginBottom: '20px' }}>
              <VolumeCalculator />
            </div>
          )}

          {/* Action Row */}
          <div className="pdp-actions-row">
            {product.stock > 0 && (
              <div className="qty-counter">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            )}

            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              style={{ flex: 1 }}
            >
              {addedSuccess ? '✓ Added to Cart!' : 'Add to Cart'}
            </button>

            <button
              type="button"
              className="btn btn-accent btn-lg"
              onClick={handleBuyNow}
              disabled={product.stock <= 0}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Specifications Grid */}
      {product.specs && (
        <div className="specs-table-card">
          <h3>Aquarium Parameters & Technical Specifications</h3>
          <div className="specs-grid">
            <div className="spec-item">
              <span className="spec-label">Brand / Breeder</span>
              <p className="spec-val">{product.brand || 'AquaCart Laboratories'}</p>
            </div>
            <div className="spec-item">
              <span className="spec-label">Category</span>
              <p className="spec-val">{product.category} ({product.subCategory})</p>
            </div>
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="spec-item">
                <span className="spec-label">{key.replace(/([A-Z])/g, ' $1')}</span>
                <p className="spec-val">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
