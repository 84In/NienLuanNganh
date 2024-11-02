import { Box, Card, CardContent, CardMedia, Rating } from "@mui/material";
import { styled } from "@mui/system";
import React, { memo } from "react";
import { formatCount, formatCurrency } from "../../utils/format";
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
          <div className="relative h-[280px]">
            <CardMedia
              component="img"
              sx={{ objectFit: "contain", height: "100%", zIndex: "10" }}
              image={
                firstImage && firstImage.startsWith("https://")
                  ? firstImage
                  : process.env.REACT_APP_SERVER_URL + firstImage
              }
              alt={product?.name}
            />
            {product.stockQuantity <= 0 && (
              <div className="absolute top-0 z-20 flex h-[280px] w-full items-center justify-center bg-[rgba(0,0,0,0.3)]">
                <div className="h-24 w-24 place-content-center place-items-center rounded-full bg-red-500 text-center text-sm text-white">
                  HẾT HÀNG
                </div>
              </div>
            )}
          </div>
          <CardContent className="flex h-[250px] min-h-[250px] flex-col justify-between gap-2 p-3">
            <div className="flex flex-col gap-1">
              <p className="line-clamp-2 min-h-10 text-sm">{product?.name}</p>
              <Rating
                name="half-rating-read"
                precision={0.5}
                value={product?.reviewDetail?.averageRating ? product?.reviewDetail?.averageRating : 0}
                readOnly
                size="small"
              />
              <div className="text-sm text-gray-600">
                Đã bán: <span>{product?.sold ? formatCount(product?.sold) : 0}</span>
              </div>
              {promotion ? (
                <>
                  <p className="text-base font-bold text-red-500 grid-md:text-lg">{formatCurrency(price)}</p>
                  <Box sx={{ display: "flex", alignItems: "baseline", mt: 1, gap: 1 }}>
                    <p className="text-xs text-gray-500 line-through">{formatCurrency(product?.price)}</p>
                    <p className="rounded bg-red-100 p-1 text-xs text-red-500">-{promotion?.discountPercentage}%</p>
                  </Box>
                </>
              ) : (
                <>
                  <p className="text-sm font-bold grid-sm:text-base grid-md:text-lg">{formatCurrency(price)}</p>
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
