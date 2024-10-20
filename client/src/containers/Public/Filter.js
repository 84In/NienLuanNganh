import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { memo, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BannerCarousel, FilterSideBar, PaginationMore, ProductCard } from "../../components";
import { usePaginationMore } from "../../hooks";
import { apiGetBrandByCategory } from "../../services";
import { minAndMaxPrice } from "../../utils";
import { bannerFilter } from "../../utils/constant";

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [brands, setBrands] = useState([]);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [urlApi, setUrlApi] = useState(`/api/v1/search/${type}/${name}`);

  const [brandFilter, setBrandFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);

  const { data, totalElements, loadMore, hasMore } = usePaginationMore(urlApi, 15, 10);

  useEffect(() => {
    const handlePathChange = () => {
      const pathParts = window.location.pathname.split("/");
      setType(pathParts[2]);
      setName(pathParts[3]);
    };
    handlePathChange();

    window.addEventListener("popstate", handlePathChange);
    return () => {
      window.removeEventListener("popstate", handlePathChange);
    };
  }, []);

  useEffect(() => {
    setSortBy("");
    setSortDirection("");
    setBrandFilter([]);
    setPriceFilter([]);
  }, [type, name]);

  useEffect(() => {
    if (type && name) {
      let newUrl = `/api/v1/search/${type}/${name}`;

      const queryParams = [];
      if (sortBy) {
        queryParams.push(`sortBy=${sortBy}`);
      }
      if (sortDirection) {
        queryParams.push(`sortDirection=${sortDirection}`);
      }

      if (brandFilter.length > 0) {
        const brandsParam = brandFilter.join(",");
        queryParams.push(`brand=${brandsParam}`);
      }

      if (priceFilter.length > 0) {
        const price = minAndMaxPrice(priceFilter);
        const pricesParam = `min=${price.min}&max=${price.max}`;
        queryParams.push(`${pricesParam}`);
      }

      // Gộp tất cả query parameters lại
      if (queryParams.length > 0) {
        newUrl += `?${queryParams.join("&")}`;
      }
      setUrlApi(newUrl);
      console.log(newUrl);
    }
  }, [urlApi, sortBy, sortDirection, type, name, priceFilter, brandFilter]);

  useEffect(() => {
    if (name) {
      const fetchBrandByCategory = async () => {
        const response = await apiGetBrandByCategory(name);
        if (response.code === 0) {
          setBrands(response.result);
        }
      };
      fetchBrandByCategory();
    }
  }, [name]);

  useEffect(() => {
    const params = {};
    if (brandFilter.length > 0) {
      params.brand = brandFilter.join(",");
    }
    if (priceFilter.length > 0) {
      const price = minAndMaxPrice(priceFilter);
      params.min = price.min;
      params.max = price.max;
    }
    setSearchParams(params);
  }, [brandFilter, priceFilter, setSearchParams]);

  const handleCategoryChange = (type, name) => {
    setType(type);
    setName(name);
  };

  console.log(brandFilter);
  console.log(priceFilter);

  return (
    <Grid2
      container
      rowGap={2}
      columnGap={"none"}
      sx={{ display: "flex", justifyContent: "space-between", width: "100%", paddingX: "1rem", height: "100%" }}
    >
      <Grid2 item xs={12}>
        <BannerCarousel data={bannerFilter} slide={3} />
      </Grid2>
      <Grid2 item xs={12} md={3}>
        <FilterSideBar
          brands={brands}
          brandFilter={brandFilter}
          priceFilter={priceFilter}
          setBrandFilter={setBrandFilter}
          setPriceFilter={setPriceFilter}
          onCategoryChange={handleCategoryChange}
        />
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
                  <option value="" className="" selected={(e) => e.target.value === `${sortBy}-${sortDirection}`}>
                    Sắp xếp
                  </option>
                  {/* <option value="review-desc">Phổ biến</option> */}
                  <option value="price-asc" selected={(e) => e.target.value === `${sortBy}-${sortDirection}`}>
                    Giá tăng dần
                  </option>
                  <option value="price-desc" selected={(e) => e.target.value === `${sortBy}-${sortDirection}`}>
                    Giá giảm dần
                  </option>
                </select>
              </div>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-2 gap-2 grid-sm:grid-cols-3 grid-md:grid-cols-4 grid-lg:grid-cols-5">
              {data.map((product, index) => (
                <Link to={`/product/id/${product.id}`} state={{ product }} key={index}>
                  <ProductCard product={product} />
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
