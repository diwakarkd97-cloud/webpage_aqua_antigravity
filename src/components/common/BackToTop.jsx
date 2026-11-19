import React, { useState, useEffect } from 'react';
import { scrollToTop } from '../../utils/domHelpers';

/**
 * Floating Back-to-Top Button with smooth scrolling DOM interaction.
 */
export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down past 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <button
      className="back-to-top-fab"
      onClick={scrollToTop}
      title="Back to Top"
      aria-label="Back to Top"
    >
      ▲
    </button>
  );
};

export default BackToTop;
