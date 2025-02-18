import { React, memo, useEffect, useState } from "react";
import { BannerCarousel, Widget, SideBar, Product, Resolution } from "..";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { usePaginationMore } from "../../hooks";
import { apiGetBannerByTitle } from "../../services";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const { homeBanner } = useSelector((state) => state.app);
  const { data: productsData } = usePaginationMore(`/api/v1/search/products`, 10, 10);
  const { data: newProductsData } = usePaginationMore(
    `/api/v1/search/products?sortBy=createdAt&sortDirection=desc`,
    10,
    10,
  );
  const { data: hotSellingProductsData } = usePaginationMore(
    `/api/v1/search/products?sortBy=sold&sortDirection=desc`,
    10,
    10,
  );

  return (
    <Grid2
      container
      rowGap={2}
      columnGap={"none"}
      sx={{ display: "flex", justifyContent: "space-between", width: "100%", paddingX: "1rem", height: "100%" }}
    >
      <Grid2 item xs={12} md={3}>
        <SideBar />
      </Grid2>
      <Grid2 item container xs={12} md={8.8} sx={{ width: "100%" }}>
        <Grid2 item container spacing={2}>
          <Grid2 sx={{ width: "100%" }}>
            <BannerCarousel data={homeBanner} />
          </Grid2>
          <Grid2 sx={{ width: "100%" }}>
            <Widget />
          </Grid2>
          <Grid2 sx={{ width: "100%" }}>
            <Product
              products={hotSellingProductsData}
              title={"Sản phẩm bán chạy"}
              readMore={"/search?sortBy=sold&sortDirection=desc"}
            />
          </Grid2>
          <Grid2 sx={{ width: "100%" }}>
            <Product
              products={newProductsData}
              title={"Sản phẩm mới nhất"}
              readMore={"/search?sortBy=createdAt&sortDirection=desc"}
            />
          </Grid2>
          <Grid2 sx={{ width: "100%" }}>
            <Product products={productsData} title={"Danh mục sản phẩm"} readMore={"/search"} />
          </Grid2>
          <Grid2 sx={{ width: "100%" }}>
            <Resolution />
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default memo(MainContainer);
