import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { memo, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProductCarousel, ProductInfo, Purchase, Review } from "../../components";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const product = location.state?.product;

  const price = product ? product.price : 0;

  return (
    <Grid2
      container
      rowGap={2}
      columnGap={"none"}
      sx={{ display: "flex", justifyContent: "space-between", width: "100%", paddingX: "1rem", height: "100%" }}
    >
      <Grid2 item container xs={12} md={8.8} sx={{ width: "100%", gap: 2 }}>
        <Grid2
          item
          container
          sx={{
            flexGrow: 1,
            p: 2,
            bgcolor: "white",
            borderRadius: "8px",
            rowGap: "1rem",
            width: "100%",
            height: "fit-content",
          }}
        >
          <Grid2 item xs={12} md={6} sx={{ p: 1, height: "100%", width: "100%" }}>
            <ProductCarousel product={product} />
          </Grid2>
          <Grid2 item xs={12} md={6} sx={{ p: 1, width: "100%" }}>
            <ProductInfo product={product} />
          </Grid2>
        </Grid2>
        <Grid2
          item
          container
          sx={{
            flexGrow: 1,
            p: 2,
            bgcolor: "white",
            borderRadius: "8px",
            rowGap: "1rem",
            width: "100%",
            height: "fit-content",
          }}
        >
          <Review />
        </Grid2>
      </Grid2>
      <Grid2 item xs={12} md={3} sx={{ width: "100%" }}>
        <Purchase price={price} quantity={quantity} setQuantity={setQuantity} />
      </Grid2>
    </Grid2>
  );
};

export default memo(ProductDetail);
