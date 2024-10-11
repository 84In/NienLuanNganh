//Product price
export const validPromotion = (promotionArray) => {
  const result =
    promotionArray && promotionArray.length > 0
      ? promotionArray.reduce((maxPromo, item) => {
          const currentDate = new Date();
          const startDate = new Date(item.startDate);
          const endDate = new Date(item.endDate);
          if (
            item.discountPercentage > (maxPromo?.discountPercentage || 0) &&
            currentDate >= startDate &&
            currentDate <= endDate &&
            item.stockQuantity > 0
          ) {
            return item;
          }
          return maxPromo;
        }, null)
      : null;
  return result;
};

export const validPrice = (price, promotion) => {
  const result =
    promotion && promotion?.discountPercentage > 0 ? price - price * (promotion.discountPercentage / 100) : price;
  return result;
};

export const validTotalPrice = (price, promotion, quantity) => {
  const result =
    promotion?.discountPercentage && promotion?.discountPercentage > 0
      ? (price - price * (promotion?.discountPercentage / 100)) * quantity
      : price * quantity;
  return result;
};
