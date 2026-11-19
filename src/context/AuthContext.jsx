import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Aarav Sharma',
    email: 'aarav@aquacart.in',
    isLoggedIn: true,
    location: 'Mumbai 400001',
    orders: [
      {
        id: 'ORD-98421',
        date: '2026-11-10',
        total: 2490,
        status: 'Delivered',
        itemsCount: 2,
      },
    ],
  });

  const [deliveryLocation, setDeliveryLocation] = useState('Mumbai 400001');

  const login = (email, name) => {
    setUser((prev) => ({
      ...prev,
      email,
      name: name || 'Aquarist User',
      isLoggedIn: true,
    }));
  };

  const logout = () => {
    setUser((prev) => ({
      ...prev,
      isLoggedIn: false,
      name: '',
      email: '',
    }));
  };

  const updateLocation = (newLocation) => {
    setDeliveryLocation(newLocation);
    setUser((prev) => ({ ...prev, location: newLocation }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        deliveryLocation,
        updateLocation,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
