import React from "react";
import { Box, Grid } from "@mui/material";
import { products } from "../utils/constant";
import CardProduct from "./CardProduct";

const Product = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 2,
        bgcolor: "white",
        borderRadius: "10px",
        rowGap: "2rem",
        width: "100%",
        height: "fit-content",
      }}
    >
      <h2 className="px-5 pt-2 text-lg font-medium text-rose-600">Danh sách sản phẩm</h2>
      <Grid container spacing={1}>
        {products.slice(0, 6 * 2).map((product, index) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
            <CardProduct {...product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Product;
