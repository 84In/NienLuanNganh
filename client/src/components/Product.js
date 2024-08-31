import React from "react";
import { Box, Grid } from "@mui/material";
import { products } from "../utils/constant";
import CardProduct from "./CardProduct";

const Product = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 2, width: "100%" }}>
      <Grid container spacing={1}>
        {products.map((product, index) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
            <CardProduct {...product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Product;
