import React from 'react';
import { Link } from 'react-router-dom';
import { formatINR } from '../../utils/currencyFormatter';
import { calculateDiscount } from '../../utils/calculateDiscount';
import { useCart } from '../../context/CartContext';

/**
 * Amazon / Flipkart Style Cart Item Component.
 * Supports quantity alteration, item removal, and live stock indicator.
 */
export const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const discount = calculateDiscount(item.price, item.originalPrice);

  const handleQtyChange = (e) => {
    const newQty = parseInt(e.target.value, 10);
    updateQuantity(item.id, newQty);
  };

  return (
    <div className="cart-item-row">
      {/* Product Thumbnail */}
      <div className="cart-item-image-col">
        <Link to={`/product/${item.id}`}>
          <img src={item.images[0]} alt={item.title} className="cart-item-img" />
        </Link>
      </div>

      {/* Product Details & Actions */}
      <div className="cart-item-details-col">
        <div className="cart-item-header">
          <Link to={`/product/${item.id}`} className="cart-item-title">
            {item.title}
          </Link>
          <div className="cart-item-price-unit">
            <span className="cart-price-current">{formatINR(item.price)}</span>
            {item.originalPrice > item.price && (
              <span className="cart-price-original">{formatINR(item.originalPrice)}</span>
            )}
          </div>
        </div>

        {/* Stock status & category note */}
        <div className="cart-item-meta">
          <span className="in-stock-label">In Stock</span>
          {item.category === 'Live Fish' && (
            <span className="live-transit-tag">🐠 Climate Controlled Shipping</span>
          )}
        </div>

        <div className="cart-item-brand">
          Brand: <strong>{item.brand || 'AquaCart'}</strong> | Category: {item.category}
        </div>

        {/* Actions Row: Quantity Selector + Delete + Save for later */}
        <div className="cart-item-actions-row">
          <div className="qty-control-wrapper">
            <label htmlFor={`qty-${item.id}`} className="qty-label">Qty:</label>
            <select
              id={`qty-${item.id}`}
              value={item.quantity}
              onChange={handleQtyChange}
              className="qty-select"
            >
              {[...Array(Math.min(10, item.stock || 10)).keys()].map((n) => (
                <option key={n + 1} value={n + 1}>
                  {n + 1}
                </option>
              ))}
            </select>
          </div>

          <span className="action-separator">|</span>

          <button
            type="button"
            className="btn-text-action action-delete"
            onClick={() => removeFromCart(item.id)}
          >
            Delete
          </button>

          <span className="action-separator">|</span>

          <button
            type="button"
            className="btn-text-action action-wishlist"
            onClick={() => alert(`Saved ${item.title} for later!`)}
          >
            Save for later
          </button>
        </div>
      </div>

      {/* Item Subtotal for line item */}
      <div className="cart-item-subtotal-col">
        <span className="item-subtotal-label">Subtotal:</span>
        <span className="item-subtotal-value">{formatINR(item.price * item.quantity)}</span>
        {discount > 0 && (
          <span className="item-subtotal-saving">
            Saved {formatINR((item.originalPrice - item.price) * item.quantity)}
          </span>
        )}
      </div>
    </div>
  );
};

export default CartItem;
