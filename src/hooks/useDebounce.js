import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce rapid value updates (e.g. search input).
 * Ensures mock queries / filters only execute after delay milliseconds.
 *
 * @param {*} value - The value to debounce
 * @param {number} delay - Delay in milliseconds (default 500ms)
 * @returns {*} Debounced value
 */
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up timeout if value changes before delay runs
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
