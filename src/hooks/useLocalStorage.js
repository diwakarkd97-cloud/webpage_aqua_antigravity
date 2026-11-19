import { useState, useEffect } from 'react';

/**
 * Custom hook for synchronizing state to browser localStorage.
 * Enables persistent shopping cart across browser reloads.
 *
 * @param {string} key - localStorage key
 * @param {*} initialValue - Fallback initial value if key does not exist
 * @returns {[*, Function]} State and setter
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error writing to localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
