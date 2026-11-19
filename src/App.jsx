import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// Context Providers
import { CartProvider } from './context/CartContext';
import { FilterProvider } from './context/FilterContext';

// Core Layout Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// 5 Main Pages
import { Home } from './pages/Home';
import { ProductListing } from './pages/ProductListing';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { NotFound } from './pages/NotFound';

/**
 * Automatically scrolls to top on route navigation
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <CartProvider>
      <FilterProvider>
        <Router>
          <div className="app-container">
            <ScrollToTop />
            <Navbar />
            <main className="main-content">
              <Routes>
                {/* 1. Home Page */}
                <Route path="/" element={<Home />} />
                {/* 2. Products Page */}
                <Route path="/products" element={<ProductListing />} />
                {/* 3. Product Details Page */}
                <Route path="/product/:id" element={<ProductDetails />} />
                {/* 4. Cart Page */}
                <Route path="/cart" element={<Cart />} />
                {/* 5. Checkout Page */}
                <Route path="/checkout" element={<Checkout />} />
                {/* 404 Fallback */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </FilterProvider>
    </CartProvider>
  );
}

export default App;
