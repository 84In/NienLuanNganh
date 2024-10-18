import React from "react";
import { formatCurrency, validPrice, validPromotion } from "../../utils";

const CheckoutItem = ({ data }) => {
  const imageArray = data?.product?.images ? JSON.parse(data?.product?.images.replace(/'/g, '"')) : [];
  const firstImage = imageArray[0] ? imageArray[0] : null;
  const promotion = validPromotion(data?.product?.promotions);
  const price = validPrice(data?.product?.price, promotion);

  return (
    <div className="flex w-full items-center">
      <div className="h-20 w-1/12 min-w-12 grid-md:min-w-20">
        <img className="h-20 w-16 object-contain" src={firstImage} alt={data?.product?.name}></img>
      </div>
      <div className="flex w-6/12 flex-col gap-1 text-xs grid-md:w-7/12 grid-md:text-sm">
        <p className="line-clamp-2 grid-md:line-clamp-1">{data?.product?.name}</p>
        <p className="text-gray-500">SL: {data?.quantity}</p>
      </div>
      {promotion ? (
        <div className="flex w-5/12 flex-col-reverse items-center justify-end gap-2 grid-md:w-4/12 grid-md:flex-row">
          <p className="text-xs text-gray-500 line-through">{formatCurrency(data?.product?.price)}</p>
          <p className="text-xs font-semibold text-red-500 grid-md:text-sm">{formatCurrency(price)}</p>
        </div>
      ) : (
        <div className="flex w-5/12 items-center justify-end gap-2 grid-md:w-4/12">
          <p className="text-xs font-semibold grid-md:text-sm">{formatCurrency(price)}</p>
        </div>
      )}
    </div>
  );
};

export default CheckoutItem;
