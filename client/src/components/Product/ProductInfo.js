import { Box, Rating } from "@mui/material";
import React, { memo } from "react";
import { formatCurrency } from "../../utils/format";

import policyImage1 from "../../assets/images/icons/product_info1.png";
import policyImage2 from "../../assets/images/icons/product_info2.png";
import { validPrice, validPromotion } from "../../utils/validator";

const ProductInfo = ({ product }) => {
  const promotion = validPromotion(product?.promotions);
  const price = validPrice(product?.price, promotion);

  console.log(promotion);
  console.log(product?.promotions);

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 1,
        display: "flex",
        flexDirection: "column",
        rowGap: 2,
        width: "100%",
        height: "fit-content",
      }}
    >
      {product && (
        <>
          <div className="flex h-5 gap-2">
            <img src={policyImage1} className="w-24" alt="Product Info 1" />
            <img src={policyImage2} className="w-28" alt="Product Info 2" />
          </div>
          <h1 className="break-words text-left text-xl font-semibold">{product?.name}</h1>
          <div className="flex items-center gap-2">
            <div className="gap flex items-center justify-start text-lg font-semibold">
              {product?.rating ? product?.rating : 0}
              <Rating
                className="ml-2"
                name="half-rating-read"
                precision={0.5}
                value={product?.rating ? product?.rating : 0}
                readOnly
                size="medium"
              />
            </div>
            |
            <p>
              Đã bán: <span>{product?.sold ? product?.sold : 0}</span>
            </p>
          </div>
          {promotion ? (
            <div className="flex flex-col gap-2 text-left grid-lg:flex-row">
              <p className="text-3xl font-bold text-red-500">{formatCurrency(price)}</p>
              <div className="flex gap-2">
                <p className="text-lg text-gray-500 line-through">{formatCurrency(product?.price)}</p>
                <p className="h-fit rounded bg-red-100 p-1 text-sm font-semibold text-red-500">
                  -{promotion.discountPercentage}%
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <p className="text-black-500 text-3xl font-bold">{formatCurrency(price)}</p>
            </div>
          )}
          <div className="w-full text-gray-600">
            <p className="font-medium text-black">Mô tả:</p>
            <p className="line-clamp-4 break-words">{product?.description}</p>
          </div>
          <div className="text-justify text-gray-600">
            <p className="font-medium text-black">Thương hiệu:</p>
            <p>{product?.brand.name}</p>
          </div>
          <div className="text-justify text-gray-600">
            <p className="font-medium text-black">Số lượng:</p>
            <p>{product?.stockQuantity}</p>
          </div>
        </>
      )}
    </Box>
  );
};

export default memo(ProductInfo);
