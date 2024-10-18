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
            currentDate <= endDate
          ) {
            return item;
          }
          return maxPromo;
        }, null)
      : null;
  return result;
};

export const validDiscountPrice = (price, promotion) => {
  const discount = price * (promotion?.discountPercentage / 100);
  return discount;
};

export const validPrice = (price, promotion) => {
  const result =
    promotion && promotion?.discountPercentage > 0 ? price - price * (promotion.discountPercentage / 100) : price;
  return result;
};

export const validTotalPrice = (price, quantity, promotion = 0) => {
  const result =
    promotion?.discountPercentage && promotion?.discountPercentage > 0
      ? (price - price * (promotion?.discountPercentage / 100)) * quantity
      : price * quantity;
  return result;
};

export const minAndMaxPrice = (priceArray) => {
  const prices = priceArray.map((range) => {
    const [min, max] = range.split("-");
    return {
      min: parseInt(min),
      max: max === "infinity" ? Infinity : parseInt(max),
    };
  });
  const minPrice = Math.min(...prices.map((price) => price.min));
  const maxPrice = Math.max(...prices.map((price) => (price.max === Infinity ? Infinity : price.max)));
  return {
    min: minPrice,
    max: maxPrice === Infinity ? "infinity" : maxPrice,
  };
};
