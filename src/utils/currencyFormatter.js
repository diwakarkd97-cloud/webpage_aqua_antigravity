/**
 * Formats a numeric value into Indian Rupee (INR / ₹) standard format.
 * Example: 14999 -> "₹14,999"
 *
 * @param {number} amount - The amount in INR
 * @param {boolean} includeDecimals - Whether to format with .00
 * @returns {string} Formatted INR currency string
 */
export const formatINR = (amount, includeDecimals = false) => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '₹0';
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: includeDecimals ? 2 : 0,
    minimumFractionDigits: includeDecimals ? 2 : 0,
  }).format(amount);
};

export default formatINR;
