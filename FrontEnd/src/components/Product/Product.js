import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { memo } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const Product = ({ title, products, readMore }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 2,
        bgcolor: "white",
        borderRadius: "8px",
        rowGap: "2rem",
        width: "100%",
        height: "fit-content",
      }}
    >
      <div className="mb-4 flex justify-between px-2">
        <h2 className="text-lg font-semibold text-rose-500">{title}</h2>
        {readMore && (
          <Link to={readMore} className="text-sm hover:text-blue-500 hover:underline">
            Xem chi tiết
          </Link>
        )}
      </div>
      <Grid2 container spacing={1}>
        {products?.slice(0, 6 * 2).map((product, index) => (
          <Grid2 item xs={6} sm={4} md={3} lg={2.4} key={index}>
            <Link to={`/product/id/${product.id}`} state={{ product }}>
              <ProductCard product={product} />
            </Link>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default memo(Product);
