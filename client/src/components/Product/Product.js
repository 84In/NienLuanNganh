import React from "react";
import { Box } from "@mui/material";
import CardProduct from "./CardProduct";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const Product = ({ title, data }) => {
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
      <h2 className="mb-4 px-2 text-lg font-semibold text-rose-500">{title}</h2>
      <Grid2 container spacing={2}>
        {data.slice(0, 6 * 2).map((product, index) => (
          <Grid2 item xs={6} sm={3} lg={2} key={index}>
            <CardProduct {...product} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Product;
