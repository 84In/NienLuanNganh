import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { memo, useEffect, useState } from "react";
import { AlertCustom, ProductCarousel, ProductInfo, Purchase, Review } from "../../components";
import { apiGetProductById } from "../../services";

const ProductDetail = ({ setIsModelLogin }) => {
  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState(null);
  const [alert, setAlert] = useState("");
  const productId = window.location.pathname.split("/").pop();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiGetProductById(productId);
        setProduct(response?.result);
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <Grid2
      container
      rowGap={2}
      columnGap={"none"}
      sx={{ display: "flex", justifyContent: "space-between", width: "100%", paddingX: "1rem", height: "100%" }}
    >
      {alert && <AlertCustom title={"Thông báo"} content={alert} />}
      <Grid2 item container xs={12} md={8.8} sx={{ width: "100%", gap: 2 }}>
        <Grid2
          item
          container
          sx={{
            flexGrow: 1,
            p: 2,
            bgcolor: "white",
            borderRadius: "8px",
            rowGap: "1rem",
            width: "100%",
            height: "fit-content",
          }}
        >
          <Grid2 item xs={12} md={6} sx={{ p: 1, height: "100%", width: "100%" }}>
            <ProductCarousel product={product} />
          </Grid2>
          <Grid2 item xs={12} md={6} sx={{ p: 1, width: "100%" }}>
            <ProductInfo product={product} />
          </Grid2>
        </Grid2>
        <Grid2
          item
          container
          sx={{
            flexGrow: 1,
            p: 2,
            bgcolor: "white",
            borderRadius: "8px",
            rowGap: "1rem",
            width: "100%",
            height: "fit-content",
          }}
        >
          <Review />
        </Grid2>
      </Grid2>
      <Grid2 item xs={12} md={3} sx={{ width: "100%" }}>
        <Purchase
          product={product}
          quantity={quantity}
          setAlert={setAlert}
          setQuantity={setQuantity}
          setIsModelLogin={setIsModelLogin}
        />
      </Grid2>
    </Grid2>
  );
};

export default memo(ProductDetail);
