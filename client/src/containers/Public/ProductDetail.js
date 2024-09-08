import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { ProductCarousel, Purchase } from "../../components";
import { Box, Rating } from "@mui/material";
import { useLocation } from "react-router-dom";
import { formatCurrency } from "../../utils/format";

const ProductDetail = () => {
  const location = useLocation();
  const product = location.state?.product;

  // Use product data here, for example:
  const price = product ? product.price : 0;

  return (
    <>
      <Grid2
        container
        rowGap={2}
        columnGap={"none"}
        sx={{ display: "flex", justifyContent: "space-between", width: "100%", paddingX: "1rem", height: "100%" }}
      >
        <Grid2 item container xs={12} md={8.8} sx={{ width: "100%" }}>
          <Grid2
            item
            container
            sx={{
              flexGrow: 1,
              p: 2,
              bgcolor: "white",
              borderRadius: "8px",
              rowGap: "2rem",
              width: "100%",
              height: "fit-content",
            }}
          >
            <Grid2 item xs={12} md={6} sx={{ p: 1, height: "100%", width: "100%" }}>
              <ProductCarousel />
            </Grid2>
            <Grid2 item xs={12} md={6} sx={{ p: 1, width: "100%" }}>
              <Box
                sx={{
                  flexGrow: 1,
                  px: 3,
                  py: 1,
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
                      <p className="rounded bg-red-100 px-2 py-1 text-sm font-semibold text-red-500">
                        -{product.discount}%
                      </p>
                    </>
                  ) : (
                    <p className="text-black-500 text-3xl font-bold">{formatCurrency(product.price)}</p>
                  )}
                </div>
              </Box>
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 item xs={12} md={3} sx={{ width: "100%" }}>
          <Purchase price={price} />
        </Grid2>
      </Grid2>
    </>
  );
};

export default ProductDetail;
