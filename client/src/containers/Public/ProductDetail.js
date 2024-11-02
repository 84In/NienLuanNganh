import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { memo, useEffect, useState } from "react";
import { AlertCustom, Product, ProductImagesCarousel, ProductInfo, Purchase, Review } from "../../components";
import { apiGetProductById } from "../../services";
import { usePaginationMore } from "../../hooks";
import { useLocation } from "react-router-dom";

const ProductDetail = ({ setIsModelLogin }) => {
  const [quantity, setQuantity] = useState(1); //Value khoi dau la 1!
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [alert, setAlert] = useState("");
  const [urlApi, setUrlApi] = useState(
    `/api/v1/search/products?search=${product?.category?.name}&sortBy=sold&sortDirection=desc`,
  );
  const [productId, setProductId] = useState(location.pathname.split("/").pop());

  const { data: relatedProductsData } = usePaginationMore(urlApi, 10, 10);

  useEffect(() => {
    const newProductId = location.pathname.split("/").pop();
    setProductId(newProductId);
  }, [location.pathname]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiGetProductById(productId);
        setProduct(response?.result);
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
    };
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  useEffect(() => {
    if (product && productId) {
      const baseUrl = `/api/v1/search/products?search=${product?.category?.name}&sortBy=sold&sortDirection=desc`;
      setUrlApi(baseUrl);
    }
  }, [product, productId]);

  return (
    <>
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
              <ProductImagesCarousel product={product} />
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
            <Review productId={productId} />
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
        <Grid2 item xs={12} sx={{ width: "100%" }}>
          <Product products={relatedProductsData} title={"Sản phẩm liên quan"} />
        </Grid2>
      </Grid2>
    </>
  );
};

export default memo(ProductDetail);
