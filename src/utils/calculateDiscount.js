/**
 * Calculates discount percentage between original price and selling price.
 *
 * @param {number} sellingPrice - Current discounted price
 * @param {number} originalPrice - Strikethrough/list price
 * @returns {number} Percentage discount (rounded integer)
 */
export const calculateDiscount = (sellingPrice, originalPrice) => {
  if (!originalPrice || originalPrice <= sellingPrice) return 0;
  return Math.round(((originalPrice - sellingPrice) / originalPrice) * 100);
};

export default calculateDiscount;
