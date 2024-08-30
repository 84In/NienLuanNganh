import { React, memo } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { SliderCustom, Widget, LeftBar, Product } from "../../components";
import { products } from "../../utils/constant";

const MainContainer = () => {
  return (
    <>
      <Grid container display="flex" justifyContent="center" gap={2} sx={{ width: "100%" }}>
        <Grid xs={12} md={2} sx={{ bgcolor: "white", borderRadius: "10px", height: "fit-content" }}>
          <LeftBar />
        </Grid>
        <Grid xs={12} md={9.5}>
          <Grid container gap={2}>
            <Grid sx={{ bgcolor: "white", borderRadius: "10px", rowGap: "2rem", width: "100%", height: "auto" }}>
              <SliderCustom />
            </Grid>
            <Grid sx={{ bgcolor: "white", borderRadius: "10px", rowGap: "2rem", width: "100%", height: "fit-content" }}>
              <Widget />
            </Grid>
            <Grid
              container
              display={"-webkit-flex"}
              justifyContent={"space-evenly"}
              gap={1}
              sx={{
                bgcolor: "white",
                borderRadius: "10px",
                rowGap: "2rem",
                width: "100%",
                height: "fit-content",
                padding: "10px",
              }}
            >
              {products.map((product, index) => (
                <Grid xs={6} sm={6} md={4} lg={3} xl={2} key={index}>
                  <Product {...product} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default memo(MainContainer);
