import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import productsData from '../data/mockDatabase';
import { ProductGrid } from '../components/product/ProductGrid';
import { useFilters } from '../context/FilterContext';

const CATEGORIES = ['All', 'Live Fish', 'Tanks', 'Filters', 'Food', 'Decor'];

export const ProductListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filters, setCategory, setSortOrder, setSearchQuery } = useFilters();

  // Read URL parameters
  useEffect(() => {
    const cat = searchParams.get('category');
    const search = searchParams.get('search');

    if (cat && CATEGORIES.includes(cat)) {
      setCategory(cat);
    } else if (!cat && !search) {
      setCategory('All');
    }

    if (search !== null) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  // Handle category tab change
  const handleCategoryClick = (cat) => {
    setCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  // Filter & Sort pipeline
  const filteredProducts = useMemo(() => {
    return productsData
      .filter((item) => {
        // Category filter
        if (filters.category !== 'All' && item.category !== filters.category) {
          return false;
        }

        // Search Keyword filter
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchCat = item.category.toLowerCase().includes(q);
          const matchSub = item.subCategory?.toLowerCase().includes(q);
          const matchBrand = item.brand?.toLowerCase().includes(q);
          if (!matchTitle && !matchCat && !matchSub && !matchBrand) return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (filters.sortOrder) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          case 'featured':
          default:
            return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
        }
      });
  }, [productsData, filters]);

  return (
    <div className="page-wrapper plp-container">
      {/* Breadcrumbs */}
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <span className="breadcrumbs-current">Products</span>
        {filters.category !== 'All' && (
          <>
            <span>›</span>
            <span className="breadcrumbs-current">{filters.category}</span>
          </>
        )}
      </nav>

      {/* Header and Toolbar */}
      <div className="plp-toolbar">
        {/* Category Pills */}
        <div className="plp-category-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`category-tab-btn ${filters.category === cat ? 'tab-active' : ''}`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat === 'All' ? '🌟 All Items' : cat}
            </button>
          ))}
        </div>

        {/* Sorting Dropdown & Results Counter */}
        <div className="plp-controls-right">
          <span style={{ fontSize: '13px', color: 'var(--slate)' }}>
            Showing <strong>{filteredProducts.length}</strong> items
          </span>
          <select
            className="sort-select"
            value={filters.sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="featured">Featured / Bestsellers</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Customer Rating</option>
          </select>
        </div>
      </div>

      {/* Active Search Notification */}
      {filters.searchQuery && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
          <span>Search results for: <strong>"{filters.searchQuery}"</strong></span>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setSearchQuery('');
              searchParams.delete('search');
              setSearchParams(searchParams);
            }}
          >
            Clear Search ✕
          </button>
        </div>
      )}

      {/* Product Grid */}
      <ProductGrid products={filteredProducts} />
    </div>
  );
};

export default ProductListing;
