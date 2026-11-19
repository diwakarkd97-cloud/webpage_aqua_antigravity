import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Context definition
export const CartContext = createContext();

// Storage key
const CART_STORAGE_KEY = 'aquacart_shopping_cart';

// Initial state retrieved from localStorage if available
const getInitialState = () => {
  try {
    const localData = localStorage.getItem(CART_STORAGE_KEY);
    return localData ? JSON.parse(localData) : { items: [] };
  } catch (err) {
    console.error('Failed reading initial cart state from localStorage:', err);
    return { items: [] };
  }
};

// Reducer Action Types
export const CART_ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
};

/**
 * Cart Reducer handling cart state transformations
 */
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_TO_CART: {
      const { product, quantity = 1 } = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === product.id);

      if (existingItemIndex > -1) {
        // Product already exists in cart: increment quantity
        const updatedItems = [...state.items];
        const existingItem = updatedItems[existingItemIndex];
        const newQty = existingItem.quantity + quantity;
        
        // Respect product stock
        const finalQty = product.stock ? Math.min(newQty, product.stock) : newQty;
        
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: finalQty,
        };
        return { ...state, items: updatedItems };
      } else {
        // Product does not exist: push new item with quantity
        const newItem = {
          ...product,
          quantity: Math.max(1, quantity),
        };
        return { ...state, items: [...state.items, newItem] };
      }
    }

    case CART_ACTIONS.REMOVE_FROM_CART: {
      const productId = action.payload;
      return {
        ...state,
        items: state.items.filter((item) => item.id !== productId),
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        // Remove item if quantity set to 0 or less
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }

    case CART_ACTIONS.CLEAR_CART: {
      return { ...state, items: [] };
    }

    default:
      return state;
  }
}

/**
 * CartProvider component
 */
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, null, getInitialState);

  // Sync to localStorage on every state mutation
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.error('Failed syncing cart to localStorage:', err);
    }
  }, [state]);

  // Derived financial & quantity calculations
  // Phase 4 Requirement: Subtotal, Shipping (free if subtotal > 1500 INR, else 100 INR), and Total
  const cartCount = state.items.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const originalSubtotal = state.items.reduce(
    (acc, item) => acc + (item.originalPrice || item.price) * item.quantity,
    0
  );

  const totalDiscount = originalSubtotal - subtotal;

  const shipping = subtotal === 0 ? 0 : subtotal >= 1500 ? 0 : 100;

  const total = subtotal + shipping;

  // Helper action dispatchers
  const addToCart = (product, quantity = 1) => {
    dispatch({
      type: CART_ACTIONS.ADD_TO_CART,
      payload: { product, quantity },
    });
  };

  const removeFromCart = (productId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_FROM_CART,
      payload: productId,
    });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        cartCount,
        subtotal,
        originalSubtotal,
        totalDiscount,
        shipping,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
