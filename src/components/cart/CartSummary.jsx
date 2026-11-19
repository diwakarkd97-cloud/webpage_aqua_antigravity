import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatINR } from '../../utils/currencyFormatter';
import { useCart } from '../../context/CartContext';

/**
 * Amazon / Flipkart Style Right-Hand Cart Order Summary Box.
 */
export const CartSummary = () => {
  const navigate = useNavigate();
  const { cartCount, subtotal, originalSubtotal, totalDiscount, shipping, total } = useCart();

  const isEligibleForFreeShipping = subtotal >= 1500;
  const remainingForFreeShipping = Math.max(0, 1500 - subtotal);

  return (
    <div className="cart-summary-card">
      {/* Free Delivery Progress Alert */}
      <div className="shipping-progress-banner">
        {isEligibleForFreeShipping ? (
          <div className="shipping-unlocked">
            <span className="check-icon">✓</span>
            <span>Your order qualifies for <strong>FREE Delivery</strong></span>
          </div>
        ) : (
          <div className="shipping-needed">
            <span className="info-icon">🚚</span>
            <span>
              Add <strong>{formatINR(remainingForFreeShipping)}</strong> more of eligible items to get{' '}
              <strong>FREE Delivery</strong>
            </span>
          </div>
        )}
      </div>

      {/* Summary Financials */}
      <div className="summary-subtotal-headline">
        <span>Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'}):</span>
        <strong className="summary-bold-price">{formatINR(subtotal)}</strong>
      </div>

      <div className="summary-breakdown-list">
        <div className="breakdown-row">
          <span>Items Total (M.R.P):</span>
          <span>{formatINR(originalSubtotal)}</span>
        </div>
        {totalDiscount > 0 && (
          <div className="breakdown-row discount-row">
            <span>Product Discount:</span>
            <span>- {formatINR(totalDiscount)}</span>
          </div>
        )}
        <div className="breakdown-row">
          <span>Estimated Shipping:</span>
          <span>
            {shipping === 0 ? (
              <strong className="text-free-green">FREE</strong>
            ) : (
              formatINR(shipping)
            )}
          </span>
        </div>
        <hr className="summary-divider" />
        <div className="breakdown-row grand-total-row">
          <strong>Order Total:</strong>
          <strong className="grand-total-amount">{formatINR(total)}</strong>
        </div>
      </div>

      {/* Gift option checkbox (Amazon clone) */}
      <div className="gift-option-row">
        <input type="checkbox" id="gift-checkbox" />
        <label htmlFor="gift-checkbox">This order contains an aquatic gift</label>
      </div>

      {/* Proceed to Checkout CTA */}
      <button
        type="button"
        className="btn btn-buy-now btn-block checkout-cta-btn"
        onClick={() => navigate('/checkout')}
        disabled={cartCount === 0}
      >
        Proceed to Buy ({cartCount} items)
      </button>

      {/* Security note */}
      <div className="checkout-security-badge">
        <span className="lock-icon">🔒</span>
        <span>Secure transactions by AquaCart Payments</span>
      </div>
    </div>
  );
};

export default CartSummary;
