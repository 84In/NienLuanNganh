import React from "react";
import { formatCurrency, validPrice, validPromotion } from "../utils";

const CheckoutItem = ({ data }) => {
  const imageArray = data?.product?.images ? JSON.parse(data?.product?.images.replace(/'/g, '"')) : [];
  const firstImage = imageArray[0] ? imageArray[0] : null;
  const promotion = validPromotion(data?.product?.promotions);
  const price = validPrice(data?.product?.price, promotion);

  return (
    <div className="flex w-full items-center">
      <div className="h-20 w-1/12 min-w-20">
        <img className="h-20 w-16 object-contain" src={firstImage} alt={data?.product?.name}></img>
      </div>
      <div className="flex w-7/12 flex-col gap-1 text-sm text-gray-500">
        <p className="line-clamp-1">{data?.product?.name}</p>
        <p>SL: {data?.quantity}</p>
      </div>
      <div className="flex w-4/12 items-center justify-end gap-2">
        {promotion ? (
          <>
            <p className="text-xs text-gray-500 line-through">{formatCurrency(data?.product?.price)}</p>
            <p className="text-sm font-semibold text-red-500">{formatCurrency(price)}</p>
          </>
        ) : (
          <p className="text-sm font-semibold">{formatCurrency(price)}</p>
        )}
      </div>
    </div>
  );
};

export default CheckoutItem;
