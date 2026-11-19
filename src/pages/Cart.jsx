import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/currencyFormatter';

export const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    cartCount,
    subtotal,
    originalSubtotal,
    totalDiscount,
    shipping,
    total,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const isFreeShipping = subtotal >= 1500;
  const remainingForFreeShipping = Math.max(0, 1500 - subtotal);

  if (cart.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="empty-state-card">
          <div className="empty-state-icon">🛒</div>
          <h2>Your AquaCart is Empty</h2>
          <p>You haven't added any aquatic life, rimless tanks, or equipment yet.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <Link to="/products" className="btn btn-primary btn-lg">
              Explore All Products
            </Link>
            <Link to="/products?category=Live Fish" className="btn btn-secondary btn-lg">
              Browse Live Fish
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <nav className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>›</span>
        <span className="breadcrumbs-current">Shopping Cart</span>
      </nav>

      <div className="cart-layout">
        {/* Left Column: Items */}
        <div className="cart-items-card">
          <div className="cart-title-row">
            <h1>Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})</h1>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>

          <div className="cart-items-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-item-row">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="cart-item-thumb"
                />

                <div className="cart-item-info">
                  <Link to={`/product/${item.id}`}>
                    <h4>{item.title}</h4>
                  </Link>
                  <p className="cart-item-category">
                    {item.category} • {item.subCategory}
                  </p>

                  <div className="cart-item-actions">
                    <div className="qty-counter">
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="btn-remove-item"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="cart-item-price-col">
                  <div className="cart-item-total">
                    {formatINR(item.price * item.quantity)}
                  </div>
                  <div className="cart-item-unit-price">
                    {formatINR(item.price)} each
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '20px' }}>
            <Link to="/products" className="btn btn-secondary btn-sm">
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="order-summary-card">
          <h3>Order Summary</h3>

          {/* Shipping Progress */}
          <div className="shipping-progress-box">
            {isFreeShipping ? (
              <span>✓ Congratulations! Your order qualifies for <strong>FREE Delivery</strong></span>
            ) : (
              <span>🚚 Add <strong>{formatINR(remainingForFreeShipping)}</strong> more to unlock <strong>FREE Delivery</strong></span>
            )}
          </div>

          <div className="summary-rows">
            <div className="summary-row">
              <span>Subtotal ({cartCount} items)</span>
              <span>{formatINR(originalSubtotal)}</span>
            </div>
            {totalDiscount > 0 && (
              <div className="summary-row" style={{ color: 'var(--accent-green)', fontWeight: 600 }}>
                <span>Discount</span>
                <span>- {formatINR(totalDiscount)}</span>
              </div>
            )}
            <div className="summary-row">
              <span>Estimated Delivery</span>
              <span>{shipping === 0 ? <strong style={{ color: 'var(--accent-green)' }}>FREE</strong> : formatINR(shipping)}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total Amount</span>
              <span style={{ color: 'var(--primary)' }}>{formatINR(total)}</span>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-lg btn-block"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout →
          </button>

          <div style={{ marginTop: '16px', fontSize: '11px', color: 'var(--slate)', textAlign: 'center' }}>
            🔒 Safe & Secure 256-Bit Encrypted Checkout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
