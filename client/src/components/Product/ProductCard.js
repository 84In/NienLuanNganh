import { Box, Card, CardContent, CardMedia, Rating } from "@mui/material";
import { styled } from "@mui/system";
import React, { memo } from "react";
import { formatCurrency } from "../../utils/format";
import { validPrice, validPromotion } from "../../utils";

const StyledCard = styled(Card)({
  minWidth: "7rem",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: 8,
  boxShadow:
    "0px 0px 2px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
});

const ProductCard = ({ product }) => {
  const imageArray = product?.images ? JSON.parse(product?.images.replace(/'/g, '"')) : [];
  const firstImage = imageArray[0] ? imageArray[0] : null;
  const promotion = validPromotion(product?.promotions);
  const price = validPrice(product?.price, promotion);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" height="100%" width="100%">
      {product && (
        <StyledCard className="product-hover">
          <div className="h-[280px]">
            <CardMedia
              component="img"
              sx={{ objectFit: "contain", height: "100%" }}
              image={
                firstImage && firstImage.startsWith("https://")
                  ? firstImage
                  : process.env.REACT_APP_SERVER_URL + firstImage
              }
              alt={product?.name}
            />
          </div>
          <CardContent className="flex h-[220px] min-h-[190px] flex-col justify-between gap-2 p-3">
            <div className="flex flex-col gap-1">
              <p className="line-clamp-2 min-h-10 text-sm">{product?.name}</p>
              <Rating name="half-rating-read" precision={0.5} value={product?.rating} readOnly size="small" />
              {promotion ? (
                <>
                  <p className="text-xl font-bold text-red-500 grid-sm:text-lg">{formatCurrency(price)}</p>
                  <Box sx={{ display: "flex", alignItems: "baseline", mt: 1, gap: 1 }}>
                    <p className="text-xs text-gray-500 line-through">{formatCurrency(product?.price)}</p>
                    <p className="rounded bg-red-100 p-1 text-xs text-red-500">-{promotion?.discountPercentage}%</p>
                  </Box>
                </>
              ) : (
                <>
                  <p className="text-lg font-bold grid-sm:text-xl">{formatCurrency(price)}</p>
                </>
              )}
            </div>
            {product?.category && <p className="mt-2 h-10 text-sm text-gray-500">Thương hiệu {product?.brand.name}</p>}
          </CardContent>
        </StyledCard>
      )}
    </Box>
  );
};

export default memo(ProductCard);
