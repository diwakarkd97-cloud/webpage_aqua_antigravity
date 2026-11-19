/**
 * Vanilla DOM helper utilities interfacing React refs with imperative browser APIs.
 */

/**
 * Calculates mouse position relative to target element in percentages (0 to 100).
 * Used for high-precision image zoom optics.
 *
 * @param {MouseEvent} event 
 * @param {HTMLElement} element 
 * @returns {{ x: number, y: number }} Relative percentage coordinates
 */
export const getRelativeCoordinates = (event, element) => {
  const rect = element.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  return {
    x: Math.max(0, Math.min(100, x)),
    y: Math.max(0, Math.min(100, y)),
  };
};

/**
 * Smoothly scrolls the window to the very top.
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

/**
 * Compatibility Checker utility for live fish species.
 * Phase 7 Requirement: Checks if fish is aggressive and gives warnings for peaceful community aquariums.
 *
 * @param {Object} product - Product data object
 * @returns {{ isAggressive: boolean, warningMessage: string | null }}
 */
export const checkFishCompatibility = (product) => {
  if (product.category !== 'Live Fish') {
    return { isAggressive: false, warningMessage: null };
  }

  const isAggressive =
    product.temperament === 'Aggressive' ||
    /cichlid|betta|piranha|shark/i.test(product.title);

  return {
    isAggressive,
    warningMessage: isAggressive
      ? '⚠️ Note: Do not keep with peaceful community fish like Tetras or Guppies.'
      : '✅ Community Friendly: Co-exists peacefully with standard community fish & shrimp.',
  };
};

/**
 * Calculates rectangular aquarium volume in Gallons and Liters.
 * Phase 7 Requirement: Volume in Gallons = (L * W * H in inches) / 231.
 * Liters = Gallons * 3.78541
 *
 * @param {number} length - inches
 * @param {number} width - inches
 * @param {number} height - inches
 * @returns {{ gallons: number, liters: number }}
 */
export const calculateTankVolume = (length, width, height) => {
  const cubicInches = Number(length) * Number(width) * Number(height);
  if (isNaN(cubicInches) || cubicInches <= 0) {
    return { gallons: 0, liters: 0 };
  }
  const gallons = cubicInches / 231;
  const liters = gallons * 3.78541;
  return {
    gallons: Number(gallons.toFixed(1)),
    liters: Number(liters.toFixed(1)),
  };
};
