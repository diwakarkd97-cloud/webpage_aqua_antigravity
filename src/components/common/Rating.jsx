import React from 'react';

/**
 * Amazon / Flipkart style Star Rating Component.
 * Supports decimal rendering with filled, half, and empty SVG stars.
 */
export const Rating = ({ value = 0, count, size = 16, showNumber = true }) => {
  const stars = [];
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.4;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(
        <span key={i} className="star star-filled" style={{ fontSize: `${size}px` }}>
          ★
        </span>
      );
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(
        <span key={i} className="star star-half" style={{ fontSize: `${size}px` }}>
          ★
        </span>
      );
    } else {
      stars.push(
        <span key={i} className="star star-empty" style={{ fontSize: `${size}px` }}>
          ☆
        </span>
      );
    }
  }

  return (
    <div className="rating-container" title={`${value} out of 5 stars`}>
      <div className="stars-row">{stars}</div>
      {showNumber && <span className="rating-value">{value.toFixed(1)}</span>}
      {count !== undefined && <span className="rating-count">({count.toLocaleString('en-IN')})</span>}
    </div>
  );
};

export default Rating;
