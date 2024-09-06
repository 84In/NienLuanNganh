import { React, memo } from "react";
import { SliderCustom, Widget, LeftBar, Product, Resolution } from "../../components";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { products } from "../../utils/constant";

const MainContainer = () => {
  return (
    <>
      <Grid2
        container
        display="flex"
        justifyContent="center"
        gap={2}
        sx={{ width: "100%", paddingX: "1rem", height: "100%" }}
      >
        <Grid2 item xs={12} md={2.5}>
          <LeftBar />
        </Grid2>
        <Grid2 item xs={12} md={9.2}>
          <Grid2 container gap={2}>
            <Grid2 sx={{ width: "100%" }}>
              <SliderCustom />
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
