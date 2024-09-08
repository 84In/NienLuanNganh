import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { ProductCarousel, Purchase } from "..";

const ProductDetail = () => {
  return (
    <>
      <Grid2
        container
        rowGap={2}
        columnGap={"none"}
        sx={{ display: "flex", justifyContent: "space-between", width: "100%", paddingX: "1rem", height: "100%" }}
      >
        <Grid2 item container xs={12} md={8.7} sx={{ width: "100%" }}>
          <Grid2 item container spacing={2}>
            <Grid2 sx={{ width: "50%" }}>
              <ProductCarousel />
            </Grid2>
            <Grid2 sx={{ width: "100%" }}></Grid2>
            <Grid2 sx={{ width: "100%" }}></Grid2>
            <Grid2 sx={{ width: "100%" }}></Grid2>
          </Grid2>
        </Grid2>

        <Grid2 item xs={12} md={3}>
          <Purchase price={135000} />
        </Grid2>
      </Grid2>
    </>
  );
};

export default ProductDetail;
