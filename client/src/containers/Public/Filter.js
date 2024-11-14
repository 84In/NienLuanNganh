import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { memo, useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { BannerCarousel, FilterContainer, FilterSideBar, PaginationMore, ProductCard } from "../../components";
import { usePaginationMore } from "../../hooks";
import { apiGetBannerByTitle, apiGetBrandByCategory } from "../../services";
import { minAndMaxPrice } from "../../utils";
import { bannerFilter } from "../../utils/constant";

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [brands, setBrands] = useState([]);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [urlApi, setUrlApi] = useState(`/api/v1/search/${type}/${name}`);

  const [brandFilter, setBrandFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);
  const [searchBanner, setSearchBanner] = useState();

  const { data, totalElements, loadMore, hasMore } = usePaginationMore(urlApi, 15, 10);

  useEffect(() => {
    const fetchBanner = async () => {
      const response = await apiGetBannerByTitle("search");
      if (response?.code === 0) {
        setSearchBanner(response?.result);
        console.log(response);
      }
    };
    fetchBanner();
  }, []);

  useEffect(() => {
    const handlePathChange = () => {
      const pathParts = location.pathname.split("/");

      setType(pathParts[2]);
      setName(pathParts[3]);
    };
    handlePathChange();

    window.addEventListener("popstate", handlePathChange);
    return () => {
      window.removeEventListener("popstate", handlePathChange);
    };
  }, [location]);

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

      if (brandFilter?.length > 0) {
        const brandsParam = brandFilter.join(",");
        queryParams.push(`brand=${brandsParam}`);
      }

      if (priceFilter?.length > 0) {
        const price = minAndMaxPrice(priceFilter);
        const pricesParam = `min=${price.min}&max=${price.max}`;
        queryParams.push(`${pricesParam}`);
      }

      // Gộp tất cả query parameters lại
      if (queryParams?.length > 0) {
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
    if (brandFilter?.length > 0) {
      params.brand = brandFilter.join(",");
    }
    if (priceFilter?.length > 0) {
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

  return (
    <Grid2
      container
      rowGap={2}
      columnGap={"none"}
      sx={{ display: "flex", justifyContent: "space-between", width: "100%", paddingX: "1rem", height: "100%" }}
    >
      <Grid2 item xs={12}>
        <BannerCarousel data={searchBanner} slide={3} />
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
          <FilterContainer
            data={data}
            totalElements={totalElements}
            loadMore={loadMore}
            hasMore={hasMore}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
          />
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default memo(Filter);
