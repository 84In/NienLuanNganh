import { Box, Rating } from "@mui/material";
import React from "react";
import { formatCurrency } from "../../utils/format";

const ProductInfo = ({ product }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 1,
        display: "flex",
        flexDirection: "column",
        rowGap: "1rem",
        width: "100%",
        height: "fit-content",
      }}
    >
      <h1 className="text-justify text-xl font-semibold">{product.name}</h1>
      <div className="flex items-center justify-start font-semibold">
        {product.rating}{" "}
        <Rating
          className="ml-2"
          name="half-rating-read"
          precision={0.5}
          value={product.rating}
          readOnly
          size="medium"
        />
      </div>
      <div className="flex items-center gap-2">
        {product.discount !== "" && product.discount > 0 ? (
          <>
            <p className="text-3xl font-bold text-red-500">{formatCurrency(product.price)}</p>
            <p className="text-lg text-gray-500 line-through">{formatCurrency(product.originalPrice)}</p>
            <p className="rounded bg-red-100 p-1 text-sm font-semibold text-red-500">-{product.discount}%</p>
          </>
        ) : (
          <p className="text-black-500 text-3xl font-bold">{formatCurrency(product.price)}</p>
        )}
      </div>
    </Box>
  );
};

export default ProductInfo;
