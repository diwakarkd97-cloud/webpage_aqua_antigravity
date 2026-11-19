import React from 'react';
import { Link } from 'react-router-dom';
import products from '../data/mockDatabase';
import { ProductCard } from '../components/product/ProductCard';

const CATEGORIES = [
  { name: 'Live Fish', icon: '🐠', desc: 'Acclimated tropical & marine species' },
  { name: 'Tanks', icon: '📦', desc: 'Optiwhite low-iron rimless glass' },
  { name: 'Filters', icon: '⚙️', desc: 'Quiet canister filters & pumps' },
  { name: 'Food', icon: '🥣', desc: 'Formulated pellets & supplements' },
  { name: 'Decor', icon: '🌿', desc: 'Bonsai driftwood & Ohko stone' },
];

export const Home = () => {
  // Select top bestsellers
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4);
  const liveFishHighlights = products.filter((p) => p.category === 'Live Fish').slice(0, 4);

  return (
    <div className="page-wrapper">
      {/* 1. Hero Banner */}
      <section className="hero-banner">
        <div className="hero-text">
          <span className="hero-tag">AQUARIUM SUPERSTORE</span>
          <h1 className="hero-title">Bring the Ocean into Your Living Room</h1>
          <p className="hero-description">
            Shop certified captive-bred ornamental fish, museum-grade rimless tanks, and advanced canister filtration with 100% Live Arrival Guarantee across India.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary btn-lg">
              Explore All Products →
            </Link>
            <Link to="/products?category=Live Fish" className="btn btn-secondary btn-lg">
              Live Fish Collection
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <h4>100%</h4>
              <p>Live Arrival Guarantee</p>
            </div>
            <div className="stat-item">
              <h4>24 Hrs</h4>
              <p>Express Dispatch</p>
            </div>
            <div className="stat-item">
              <h4>15,000+</h4>
              <p>Aquariums Shipped</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Quick Select Cards */}
      <section>
        <div className="section-header">
          <div>
            <h2>Shop by Category</h2>
            <p>Everything you need for a pristine freshwater or marine ecosystem</p>
          </div>
          <Link to="/products" className="section-link">
            View All Categories ›
          </Link>
        </div>

        <div className="category-chips-grid">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="category-chip-card"
            >
              <div className="chip-icon">{cat.icon}</div>
              <div className="chip-info">
                <h4>{cat.name}</h4>
                <span>{cat.desc}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured Bestsellers */}
      <section style={{ marginBottom: '48px' }}>
        <div className="section-header">
          <div>
            <h2>🔥 Trending Bestsellers</h2>
            <p>Most popular picks chosen by aquarists this week</p>
          </div>
          <Link to="/products" className="section-link">
            See All Products ›
          </Link>
        </div>

        <div className="product-grid">
          {bestsellers.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 4. Value Proposition Strip */}
      <section className="features-strip">
        <div className="feature-box">
          <div className="feature-icon-wrapper">🐟</div>
          <div className="feature-text">
            <h4>Live Arrival Guarantee</h4>
            <p>Oxygenated thermo-insulated transit packs ensure 100% survival rate.</p>
          </div>
        </div>

        <div className="feature-box">
          <div className="feature-icon-wrapper">🚚</div>
          <div className="feature-text">
            <h4>Free Express Shipping</h4>
            <p>Complimentary priority air shipping on all orders above ₹1,500.</p>
          </div>
        </div>

        <div className="feature-box">
          <div className="feature-icon-wrapper">🧪</div>
          <div className="feature-text">
            <h4>Lab Quarantined</h4>
            <p>Every fish is quarantined for 14 days before dispatch to prevent diseases.</p>
          </div>
        </div>

        <div className="feature-box">
          <div className="feature-icon-wrapper">💬</div>
          <div className="feature-text">
            <h4>Expert Support</h4>
            <p>Free water chemistry and compatibility advice from senior aquarists.</p>
          </div>
        </div>
      </section>

      {/* 5. Live Tropical Fish Highlights */}
      <section>
        <div className="section-header">
          <div>
            <h2>🐠 Exotic Live Fish & Invertebrates</h2>
            <p>Healthy, active specimens acclimated to tap water</p>
          </div>
          <Link to="/products?category=Live Fish" className="section-link">
            Explore All Fish ({products.filter(p => p.category === 'Live Fish').length}) ›
          </Link>
        </div>

        <div className="product-grid">
          {liveFishHighlights.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
