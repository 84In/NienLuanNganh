import { Box, Rating } from "@mui/material";
import React, { memo } from "react";
import { formatCurrency } from "../../utils/format";

import image1 from "../../assets/images/icons/product_info1.png";
import image2 from "../../assets/images/icons/product_info2.png";

const ProductInfo = ({ product }) => {
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
      <div className="flex h-5 gap-2">
        <img src={image1} className="w-24" alt="Product Info 1" />
        <img src={image2} className="w-28" alt="Product Info 2" />
      </div>
      <h1 className="text-justify text-xl font-semibold">{product?.name}</h1>
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
      <div className="flex items-center gap-2">
        {product?.discount !== "" && product?.discount > 0 ? (
          <>
            <p className="text-3xl font-bold text-red-500">
              {formatCurrency(product?.price - product?.price * (product?.discount / 100))}
            </p>
            <p className="text-lg text-gray-500 line-through">{formatCurrency(product?.price)}</p>
            <p className="rounded bg-red-100 p-1 text-sm font-semibold text-red-500">-{product?.discount}%</p>
          </>
        ) : (
          <p className="text-black-500 text-3xl font-bold">{formatCurrency(product?.price)}</p>
        )}
      </div>
      <div className="text-justify text-gray-600">
        <p className="font-medium text-black">Mô tả:</p>
        <p>{product?.description}</p>
      </div>
      <div className="text-justify text-gray-600">
        <p className="font-medium text-black">Thương hiệu:</p>
        <p>{product?.brand.name}</p>
      </div>
      <div className="text-justify text-gray-600">
        <p className="font-medium text-black">Số lượng:</p>
        <p>{product?.stockQuantity}</p>
      </div>
    </Box>
  );
};

export default memo(ProductInfo);
