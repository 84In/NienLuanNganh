import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BannerCarousel, FilterSideBar, PaginationMore, ProductCard } from "../../components";
import { usePaginationMore } from "../../hooks";
import { banner_filter } from "../../utils/constant";

const Filter = () => {
  const type = window.location.pathname.split("/")[2];
  const name = window.location.pathname.split("/")[3];

  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [urlApi, setUrlApi] = useState(`api/v1/search/${type}/${name}`);

  const { data, totalElements, loadMore, hasMore } = usePaginationMore(urlApi, 15, 10);

  useEffect(() => {
    let newUrl = `api/v1/search/${type}/${name}`;
    if (sortBy) {
      newUrl += `?sortBy=${sortBy}`;
      if (sortDirection) {
        newUrl += `&sortDirection=${sortDirection}`;
      }
    }
    setUrlApi(newUrl);
  }, [sortBy, sortDirection, type, name]);

  return (
    <Grid2
      container
      rowGap={2}
      columnGap={"none"}
      sx={{ display: "flex", justifyContent: "space-between", width: "100%", paddingX: "1rem", height: "100%" }}
    >
      <Grid2 item xs={12}>
        <BannerCarousel data={banner_filter} slide={3} />
      </Grid2>
      <Grid2 item xs={12} md={3}>
        <FilterSideBar />
      </Grid2>
      <Grid2 item container xs={12} md={8.8} gap={2}>
        <Grid2 item xs={12}>
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
            {/* Sort options */}
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm text-gray-500">{totalElements} sản phẩm</span>
              <div className="relative">
                <select
                  className="w-[180px] rounded-md border p-2"
                  value={sortBy + "-" + sortDirection}
                  onChange={(e) => {
                    const [newSortBy, newSortDirection] = e.target.value.split("-");
                    setSortBy(newSortBy);
                    setSortDirection(newSortDirection);
                  }}
                >
                  <option value="" className="hidden" selected>
                    Sắp xếp
                  </option>
                  <option value="popular-desc">Phổ biến</option>
                  <option value="price-asc">Giá tăng dần</option>
                  <option value="price-desc">Giá giảm dần</option>
                </select>
              </div>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-2 gap-2 grid-sm:grid-cols-3 grid-md:grid-cols-4 grid-lg:grid-cols-5">
              {data.map((product, index) => (
                <Link to={`/product/id/${product.id}`} state={{ product }} key={index}>
                  <ProductCard {...product} />
                </Link>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-center p-2">
              <PaginationMore loadMore={loadMore} hasMore={hasMore} />
            </div>
          </Box>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default memo(Filter);
