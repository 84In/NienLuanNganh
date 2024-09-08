import { React, memo } from "react";
import { BannerCarousel, Widget, LeftBar, Product, Resolution } from "..";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { banner, products } from "../../utils/constant";

const MainContainer = () => {
  return (
    <>
      <Grid2
        container
        rowGap={2}
        columnGap={"none"}
        sx={{ display: "flex", justifyContent: "space-between", width: "100%", paddingX: "1rem", height: "100%" }}
      >
        <Grid2 item xs={12} md={2.5}>
          <LeftBar />
        </Grid2>
        <Grid2 item container xs={12} md={9.3} sx={{ width: "100%" }}>
          <Grid2 item container spacing={2}>
            <Grid2 sx={{ width: "100%" }}>
              <BannerCarousel data={banner} />
            </Grid2>
            <Grid2 sx={{ width: "100%" }}>
              <Widget />
            </Grid2>
            <Grid2 sx={{ width: "100%" }}>
              <Product data={products} title={"Danh mục sản phẩm"} />
            </Grid2>
            <Grid2 sx={{ width: "100%" }}>
              <Resolution />
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
};

export default memo(MainContainer);
