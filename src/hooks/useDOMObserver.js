import { useEffect, useState } from 'react';

/**
 * Custom hook wrapping native IntersectionObserver API.
 * Tracks when a referenced DOM target element enters or leaves the viewport.
 *
 * @param {React.RefObject} targetRef - Reference to observed DOM node
 * @param {Object} options - IntersectionObserver configuration
 * @returns {boolean} isIntersecting
 */
export const useDOMObserver = (targetRef, options = { threshold: 0, rootMargin: '0px' }) => {
  const [isIntersecting, setIsIntersecting] = useState(true);

  useEffect(() => {
    const target = targetRef?.current;
    if (!target || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(([entry]) => {
      // Direct DOM intersection update
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [targetRef, options]);

  return isIntersecting;
};

export default useDOMObserver;
