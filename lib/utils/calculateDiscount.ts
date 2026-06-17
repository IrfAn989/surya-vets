export const calculateDiscount = (mrp: number, salePrice: number): number => {
  if (!mrp || mrp <= 0) return 0;
  return Math.round(((mrp - salePrice) / mrp) * 100);
};
