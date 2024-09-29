import { Box, Card, CardContent, CardMedia, Rating } from "@mui/material";
import { styled } from "@mui/system";
import React, { memo } from "react";
import { formatCurrency } from "../../utils/format";

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

const ProductCard = ({ images, name, price, originalPrice, discount, origin, rating }) => {
  const imagesUrl = JSON.parse(images.replace(/'/g, '"'));
  const firstImageUrl = imagesUrl[0];

  return (
    <Box display="flex" flexDirection="column" alignItems="center" height="100%" width="100%">
      <StyledCard className="product-hover">
        <div className="min-h-[280px]">
          <CardMedia
            component="img"
            sx={{ objectFit: "contain", height: "100%" }}
            image={
              firstImageUrl && firstImageUrl.startsWith("https://")
                ? firstImageUrl
                : process.env.REACT_APP_SERVER_URL + firstImageUrl
            }
            alt={name}
          />
        </div>
        <CardContent className="flex h-full min-h-[190px] flex-col justify-between p-3">
          <div className="flex flex-col gap-1">
            <p className="line-clamp-2 min-h-10 text-sm">{name}</p>
            <Rating name="half-rating-read" precision={0.5} value={rating} readOnly size="small" />
            {discount > 0 ? (
              <>
                <p className="text-lg font-bold text-red-500 grid-sm:text-xl">{formatCurrency(price)}</p>
                <Box sx={{ display: "flex", alignItems: "baseline", mt: 1, gap: 1 }}>
                  <p className="text-sm text-gray-500 line-through">{formatCurrency(originalPrice)}</p>
                  <p className="rounded bg-red-100 p-1 text-xs font-semibold text-red-500">-{discount}%</p>
                </Box>
              </>
            ) : (
              <p className="text-lg font-bold grid-sm:text-xl">{formatCurrency(price)}</p>
            )}
          </div>
          {origin && <p className="mt-2 text-sm text-gray-500">Made in {origin}</p>}
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default memo(ProductCard);
