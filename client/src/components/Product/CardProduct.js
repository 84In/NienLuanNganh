import React from "react";
import { Card, CardContent, CardMedia, Typography, Box, Rating } from "@mui/material";
import { styled } from "@mui/system";
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

const CardProduct = ({ image, name, price, originalPrice, discount, origin, rating }) => {
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
              <Typography variant="h6" color="error" fontWeight="bold">
                {formatCurrency(price)}
              </Typography>
              <Box display="flex" alignItems="baseline" mt={1}>
                <Typography variant="caption" color="text.secondary" sx={{ textDecoration: "line-through" }}>
                  {formatCurrency(originalPrice)}
                </Typography>
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ ml: 1, bgcolor: "#fdd4d4", borderRadius: "3px", paddingX: "3px" }}
                >
                  -{discount}%
                </Typography>
              </Box>
            </>
          ) : (
            <Typography variant="h6" fontWeight="bold">
              {formatCurrency(price)}
            </Typography>
          )}
          <Typography variant="caption" color="text.secondary">
            Made in {origin}
          </Typography>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default CardProduct;
