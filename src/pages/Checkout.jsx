import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/currencyFormatter';

export const Checkout = () => {
  const { cart, cartCount, subtotal, shipping, total, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: 'Aarav Sharma',
    phone: '9876543210',
    address: 'Flat 402, Coral Palms, Sea Face Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
  });

  const [deliveryOption, setDeliveryOption] = useState('express');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('aarav@okaxis');
  const [errors, setErrors] = useState({});
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!/^[6-9]\d{9}$/.test(formData.phone)) newErrors.phone = 'Valid 10-digit mobile number required.';
    if (!formData.address.trim()) newErrors.address = 'Street address is required.';
    if (!formData.city.trim()) newErrors.city = 'City is required.';
    if (!/^[1-9][0-9]{5}$/.test(formData.pincode)) newErrors.pincode = 'Valid 6-digit Indian PIN code required.';
    if (paymentMethod === 'upi' && !upiId.trim()) newErrors.upi = 'UPI ID is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const generatedId = `AQUA-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderConfirmed(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (orderConfirmed) {
    return (
      <div className="page-wrapper">
        <div className="order-success-card">
          <div className="success-icon">✓</div>
          <h1>Order Placed Successfully!</h1>
          <p className="order-ref">Order Reference: <strong>{orderId}</strong></p>

          <div className="success-box">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Delivery Address:</span>
              <strong>{formData.fullName}, {formData.city} - {formData.pincode}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Estimated Delivery:</span>
              <strong>Tomorrow by 2:00 PM (Oxygen Express)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Payment Mode:</span>
              <strong>{paymentMethod.toUpperCase()}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '6px' }}>
              <span>Amount Paid:</span>
              <strong style={{ color: 'var(--primary)', fontSize: '15px' }}>{formatINR(total)}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <Link to="/products" className="btn btn-primary btn-lg">
              Continue Shopping
            </Link>
            <Link to="/" className="btn btn-secondary btn-lg">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="empty-state-card">
          <h2>Your cart is empty</h2>
          <p>Please add products before heading to checkout.</p>
          <Link to="/products" className="btn btn-primary">
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <nav className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>›</span>
        <Link to="/cart">Cart</Link>
        <span>›</span>
        <span className="breadcrumbs-current">Checkout</span>
      </nav>

      <form onSubmit={handlePlaceOrder}>
        <div className="checkout-layout">
          {/* Left Column: Checkout Steps */}
          <div>
            {/* Step 1: Address */}
            <div className="checkout-card">
              <div className="checkout-step-header">
                <span className="step-badge">1</span>
                <h3>Shipping & Delivery Address</h3>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    className="form-control"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Aarav Sharma"
                  />
                  {errors.fullName && <span style={{ color: '#ef4444', fontSize: '12px' }}>{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">10-Digit Mobile Phone *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    maxLength={10}
                    className="form-control"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="9876543210"
                  />
                  {errors.phone && <span style={{ color: '#ef4444', fontSize: '12px' }}>{errors.phone}</span>}
                </div>

                <div className="form-group span-full">
                  <label htmlFor="address">Flat / House No. / Street Address *</label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    className="form-control"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="e.g. 402 Coral Palms, Sea Face Road"
                  />
                  {errors.address && <span style={{ color: '#ef4444', fontSize: '12px' }}>{errors.address}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    className="form-control"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Mumbai"
                  />
                  {errors.city && <span style={{ color: '#ef4444', fontSize: '12px' }}>{errors.city}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="pincode">6-Digit PIN Code *</label>
                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    maxLength={6}
                    className="form-control"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="400001"
                  />
                  {errors.pincode && <span style={{ color: '#ef4444', fontSize: '12px' }}>{errors.pincode}</span>}
                </div>
              </div>
            </div>

            {/* Step 2: Transit Method */}
            <div className="checkout-card">
              <div className="checkout-step-header">
                <span className="step-badge">2</span>
                <h3>Delivery Speed</h3>
              </div>

              <div className="payment-options-list">
                <label className={`payment-option-label ${deliveryOption === 'express' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="delivery"
                    value="express"
                    checked={deliveryOption === 'express'}
                    onChange={() => setDeliveryOption('express')}
                  />
                  <div>
                    <strong>Oxygen Express Transit (Recommended for Live Fish)</strong>
                    <p style={{ fontSize: '12px', color: 'var(--slate)', margin: '2px 0 0 0' }}>
                      Delivered within 24 hours with temperature heat/ice packs.
                    </p>
                  </div>
                </label>

                <label className={`payment-option-label ${deliveryOption === 'standard' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="delivery"
                    value="standard"
                    checked={deliveryOption === 'standard'}
                    onChange={() => setDeliveryOption('standard')}
                  />
                  <div>
                    <strong>Standard Ground Transit (2-3 Business Days)</strong>
                    <p style={{ fontSize: '12px', color: 'var(--slate)', margin: '2px 0 0 0' }}>
                      Best for tanks, canister filters, and dry goods.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Step 3: Payment */}
            <div className="checkout-card">
              <div className="checkout-step-header">
                <span className="step-badge">3</span>
                <h3>Payment Method</h3>
              </div>

              <div className="payment-options-list">
                <label className={`payment-option-label ${paymentMethod === 'upi' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                  />
                  <div>
                    <strong>UPI (Google Pay, PhonePe, Paytm, BHIM)</strong>
                  </div>
                </label>
                {paymentMethod === 'upi' && (
                  <div style={{ paddingLeft: '28px', marginTop: '-4px', marginBottom: '8px' }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. username@okaxis"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                    {errors.upi && <span style={{ color: '#ef4444', fontSize: '12px' }}>{errors.upi}</span>}
                  </div>
                )}

                <label className={`payment-option-label ${paymentMethod === 'card' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  <div>
                    <strong>Credit or Debit Card (Visa, MasterCard, RuPay)</strong>
                  </div>
                </label>

                <label className={`payment-option-label ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                  />
                  <div>
                    <strong>Cash on Delivery (Pay upon arrival)</strong>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Review */}
          <div className="order-summary-card">
            <h3>Review Order ({cartCount} items)</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px', maxHeight: '240px', overflowY: 'auto' }}>
              {cart.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <img src={item.images[0]} alt={item.title} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</p>
                    <span style={{ fontSize: '11px', color: 'var(--slate)' }}>Qty: {item.quantity} × {formatINR(item.price)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-rows">
              <div className="summary-row">
                <span>Items Subtotal</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping Fee</span>
                <span>{shipping === 0 ? <strong style={{ color: 'var(--accent-green)' }}>FREE</strong> : formatINR(shipping)}</span>
              </div>
              <div className="summary-row total-row">
                <span>Order Total</span>
                <span style={{ color: 'var(--primary)' }}>{formatINR(total)}</span>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg btn-block">
              Place Order ({formatINR(total)}) →
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
