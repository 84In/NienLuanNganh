import { Box, Button } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { memo, useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { BannerCarousel, FilterSideBar, Loading, PaginationMore, ProductCard } from "../../components";
import { banner_filter } from "../../utils/constant";
import { usePaginationMore } from "../../hooks";
import { Link } from "react-router-dom";

const Filter = () => {
  const type = window.location.pathname.split("/")[2];
  const name = window.location.pathname.split("/")[3];
  const { data, totalElements, loading, loadMore, hasMore } = usePaginationMore(
    `api/v1/search/${type}/${name}`,
    15,
    10,
  );

  // const [priceFilter, setPriceFilter] = useState([]);
  // const [brandFilter, setBrandFilter] = useState([]);
  // const [colorFilter, setColorFilter] = useState([]);

  // const handlePriceFilterChange = (value) => {
  //   setPriceFilter((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  // };

  // const handleBrandFilterChange = (value) => {
  //   setBrandFilter((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  // };

  // const handleColorFilterChange = (value) => {
  //   setColorFilter((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  // };

  // const filteredMotorcycles = motorcycleData.filter((motorcycle) => {
  //   const priceMatch =
  //     priceFilter.length === 0 ||
  //     priceFilter.some((range) => {
  //       const [min, max] = range.split("-").map(Number);
  //       return motorcycle.price >= min && (max ? motorcycle.price < max : true);
  //     });
  //   const brandMatch = brandFilter.length === 0 || brandFilter.includes(motorcycle.brand);
  //   const colorMatch = colorFilter.length === 0 || colorFilter.includes(motorcycle.color);
  //   return priceMatch && brandMatch && colorMatch;
  // });

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
              <span className="text-sm text-gray-500">Hiển thị {totalElements} sản phẩm</span>
              <div class="relative">
                <select class="w-[180px] rounded-md border p-2">
                  <option className="hidden" selected disabled>
                    Sắp xếp
                  </option>
                  <option value="popular">Phổ biến</option>
                  <option value="newest">Mới nhất</option>
                  <option value="price-asc">Giá tăng dần</option>
                  <option value="price-desc">Giá giảm dần</option>
                </select>
              </div>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-2 gap-2 grid-sm:grid-cols-3 grid-md:grid-cols-4 grid-lg:grid-cols-5">
              {data.map((product, index) => (
                <Link to={`/product/id/${product.id}`} state={{ product }}>
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
