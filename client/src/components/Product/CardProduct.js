import { Box, Card, CardContent, CardMedia, Rating, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React, { memo } from "react";
import { formatCurrency } from "../../utils/format";

const StyledCard = styled(Card)({
  maxWidth: "11.5rem",
  minWidth: "7rem",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: 8,
  boxShadow:
    "0px 0px 2px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
});

const ProductName = styled(Typography)({
  display: "-webkit-box",
  WebkitLineClamp: 2, //to limit the text to two lines
  WebkitBoxOrient: "vertical", //to set the text direction
  overflow: "hidden",
  textOverflow: "ellipsis",
  lineHeight: "1.2em",
  maxHeight: "2.4em",
});

const CardProduct = ({ image, name, description, price, originalPrice, discount, origin, rating }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" height="100%">
      <StyledCard className="product-hover">
        <CardMedia component="img" sx={{ objectFit: "cover", height: "auto" }} image={image} alt={name} />
        <CardContent sx={{ padding: "10px" }}>
          <ProductName variant="subtitle2" gutterBottom>
            {name}
          </ProductName>
          <Rating name="half-rating-read" precision={0.5} value={rating} readOnly size="small" />
          {discount > 0 ? (
            <>
              <p className="text-xl font-bold text-red-500">{formatCurrency(price)}</p>
              <Box sx={{ display: "flex", alignItems: "baseline", mt: 1, gap: 1 }}>
                <p className="text-sm text-gray-500 line-through">{formatCurrency(originalPrice)}</p>
                <p className="rounded bg-red-100 p-1 text-xs font-semibold text-red-500">-{discount}%</p>
              </Box>
            </>
          ) : (
            <p className="text-xl font-bold">{formatCurrency(price)}</p>
          )}
          <p className="mt-2 text-sm text-gray-500">Made in {origin}</p>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default memo(CardProduct);
