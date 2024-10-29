import React, { memo, useEffect, useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useSearchParams, useLocation } from "react-router-dom";
import { BannerCarousel, FilterContainer } from "../../components";
import { usePaginationMore } from "../../hooks";
import { minAndMaxPrice } from "../../utils";
import { bannerFilter } from "../../utils/constant";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "");
  const [sortDirection, setSortDirection] = useState(searchParams.get("sortDirection") || "");
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");
  const [priceFilter, setPriceFilter] = useState(() => {
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    return min && max ? [parseInt(min), parseInt(max)] : [];
  });
  const [urlApi, setUrlApi] = useState(`/api/v1/search/products${location.search}`);

  const { data, totalElements, loadMore, hasMore } = usePaginationMore(urlApi, 20, 10);

  // Update searchValue when searchParams change
  useEffect(() => {
    const newSearchValue = searchParams.get("search") || "";
    if (newSearchValue !== searchValue) {
      setSearchValue(newSearchValue);
    }
  }, [searchParams, searchValue]);

  // Update URL and query parameters based on filter changes
  useEffect(() => {
    const queryParams = new URLSearchParams(searchParams);

    const updateUrlApi = () => {
      let newUrl = `/api/v1/search/products`;

      if (searchValue) queryParams.set("search", searchValue);
      if (sortBy) queryParams.set("sortBy", sortBy);
      if (sortDirection) queryParams.set("sortDirection", sortDirection);
      if (priceFilter.length > 0) {
        const price = minAndMaxPrice(priceFilter);
        queryParams.set("min", price.min);
        queryParams.set("max", price.max);
      }

      const queryString = queryParams.toString();
      if (queryString) {
        newUrl += `?${queryString}`;
      }
      return newUrl;
    };

    const newUrlApi = updateUrlApi();
    if (newUrlApi !== urlApi) {
      setUrlApi(newUrlApi);
      setSearchParams(queryParams);
    }
  }, [searchValue, sortBy, sortDirection, priceFilter, urlApi, setSearchParams]);

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
      <Grid2 item container xs={12} gap={2}>
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

export default memo(Search);
