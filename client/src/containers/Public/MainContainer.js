import { React, memo } from "react";
import { Grid } from "@mui/material";
import { SliderCustom, Widget, LeftBar, Product } from "../../components";

const MainContainer = () => {
  return (
    <>
      <Grid
        container
        display="flex"
        justifyContent="center"
        gap={2}
        sx={{ width: "100%", paddingX: "1rem", height: "100%" }}
      >
        <Grid item xs={12} md={2}>
          <LeftBar />
        </Grid>
        <Grid item xs={12} md={9.5}>
          <Grid container gap={2}>
            <Grid sx={{ width: "100%" }}>
              <SliderCustom />
            </Grid>
            <Grid sx={{ width: "100%" }}>
              <Widget />
            </Grid>
            <Grid sx={{ width: "100%" }}>
              <Product />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default memo(MainContainer);
