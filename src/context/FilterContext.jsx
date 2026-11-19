import React, { createContext, useContext, useReducer } from 'react';

export const FilterContext = createContext();

export const FILTER_ACTIONS = {
  SET_CATEGORY: 'SET_CATEGORY',
  SET_PRICE_RANGE: 'SET_PRICE_RANGE',
  TOGGLE_RATING: 'TOGGLE_RATING',
  SET_SORT_ORDER: 'SET_SORT_ORDER',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  TOGGLE_BRAND: 'TOGGLE_BRAND',
  RESET_FILTERS: 'RESET_FILTERS',
};

const initialFilterState = {
  category: 'All', // 'All' | 'Live Fish' | 'Tanks' | 'Food' | 'Decor' | 'Filters'
  priceRange: { min: 0, max: 20000 },
  rating: 0, // 0 | 4 | 3
  brands: [], // ['Tetra', 'API', 'Seachem', 'Fluval', 'AquaArt']
  sortOrder: 'featured', // 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'
  searchQuery: '',
};

function filterReducer(state, action) {
  switch (action.type) {
    case FILTER_ACTIONS.SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };

    case FILTER_ACTIONS.SET_PRICE_RANGE:
      return {
        ...state,
        priceRange: {
          min: Number(action.payload.min),
          max: Number(action.payload.max),
        },
      };

    case FILTER_ACTIONS.TOGGLE_RATING:
      return {
        ...state,
        rating: state.rating === action.payload ? 0 : action.payload,
      };

    case FILTER_ACTIONS.TOGGLE_BRAND: {
      const brand = action.payload;
      const exists = state.brands.includes(brand);
      return {
        ...state,
        brands: exists
          ? state.brands.filter((b) => b !== brand)
          : [...state.brands, brand],
      };
    }

    case FILTER_ACTIONS.SET_SORT_ORDER:
      return {
        ...state,
        sortOrder: action.payload,
      };

    case FILTER_ACTIONS.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };

    case FILTER_ACTIONS.RESET_FILTERS:
      return {
        ...initialFilterState,
        searchQuery: state.searchQuery, // keep active search keyword
      };

    default:
      return state;
  }
}

export const FilterProvider = ({ children }) => {
  const [filters, dispatch] = useReducer(filterReducer, initialFilterState);

  const setCategory = (category) => {
    dispatch({ type: FILTER_ACTIONS.SET_CATEGORY, payload: category });
  };

  const setPriceRange = (min, max) => {
    dispatch({ type: FILTER_ACTIONS.SET_PRICE_RANGE, payload: { min, max } });
  };

  const toggleRating = (rating) => {
    dispatch({ type: FILTER_ACTIONS.TOGGLE_RATING, payload: rating });
  };

  const toggleBrand = (brand) => {
    dispatch({ type: FILTER_ACTIONS.TOGGLE_BRAND, payload: brand });
  };

  const setSortOrder = (sortOrder) => {
    dispatch({ type: FILTER_ACTIONS.SET_SORT_ORDER, payload: sortOrder });
  };

  const setSearchQuery = (query) => {
    dispatch({ type: FILTER_ACTIONS.SET_SEARCH_QUERY, payload: query });
  };

  const resetFilters = () => {
    dispatch({ type: FILTER_ACTIONS.RESET_FILTERS });
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        setCategory,
        setPriceRange,
        toggleRating,
        toggleBrand,
        setSortOrder,
        setSearchQuery,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};

export default FilterContext;
