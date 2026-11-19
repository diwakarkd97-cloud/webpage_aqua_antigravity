import React, { useState } from 'react';
import { calculateTankVolume } from '../../utils/domHelpers';

/**
 * Phase 7 Requirement: Interactive Tank Volume Calculator
 * Calculates aquarium capacity in Gallons and Liters from L x W x H in inches.
 */
export const VolumeCalculator = () => {
  const [length, setLength] = useState('36');
  const [width, setWidth] = useState('12');
  const [height, setHeight] = useState('16');
  const [volume, setVolume] = useState({ gallons: 30, liters: 113.6 });

  const handleCalculate = (e) => {
    e.preventDefault();
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);

    if (!isNaN(l) && !isNaN(w) && !isNaN(h) && l > 0 && w > 0 && h > 0) {
      const res = calculateTankVolume(l, w, h);
      setVolume(res);
    }
  };

  return (
    <div className="tank-volume-calculator-card">
      <div className="calc-header">
        <span className="calc-icon">📐</span>
        <h4>Aquarium Volume & Water Weight Calculator</h4>
      </div>
      <p className="calc-desc">
        Calculate your custom tank capacity in US Gallons & Liters before setting up your biotope.
      </p>

      <form onSubmit={handleCalculate} className="calc-form">
        <div className="calc-inputs-row">
          <div className="calc-input-group">
            <label htmlFor="tank-length">Length (in)</label>
            <input
              id="tank-length"
              type="number"
              min="1"
              step="0.5"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              required
            />
          </div>

          <div className="calc-input-group">
            <label htmlFor="tank-width">Width (in)</label>
            <input
              id="tank-width"
              type="number"
              min="1"
              step="0.5"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              required
            />
          </div>

          <div className="calc-input-group">
            <label htmlFor="tank-height">Height (in)</label>
            <input
              id="tank-height"
              type="number"
              min="1"
              step="0.5"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-secondary calc-submit-btn">
            Calculate
          </button>
        </div>
      </form>

      {/* Output Results */}
      <div className="calc-results-box">
        <div className="calc-result-metric">
          <span className="metric-label">Water Capacity:</span>
          <span className="metric-value-gallons">{volume.gallons} Gallons</span>
          <span className="metric-divider">/</span>
          <span className="metric-value-liters">{volume.liters} Liters</span>
        </div>
        <div className="calc-result-note">
          Approx. filled water weight: ~{(volume.liters * 1).toFixed(0)} kg (excluding substrate & rocks)
        </div>
      </div>
    </div>
  );
};

export default VolumeCalculator;
