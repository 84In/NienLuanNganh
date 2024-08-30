import { React, memo } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import SliderCustom from "./SliderCustom";
import LeftBar from "./LeftBar";
import Widget from "./Widget";

const MainContainer = () => {
  return (
    <>
      <Grid container display="flex" justifyContent="center" gap={2} sx={{ width: "100%" }}>
        <Grid xs={12} sm={2} sx={{ bgcolor: "white", borderRadius: "10px", height: "fit-content" }}>
          <LeftBar />
        </Grid>
        <Grid xs={12} sm={9.5}>
          <Grid container gap={2}>
            <Grid sx={{ bgcolor: "white", borderRadius: "10px", rowGap: "2rem", width: "100%", height: "auto" }}>
              <SliderCustom />
            </Grid>
            <Grid sx={{ bgcolor: "white", borderRadius: "10px", rowGap: "2rem", width: "100%", height: "fit-content" }}>
              <Widget />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default memo(MainContainer);
