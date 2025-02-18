import React from "react";
import PaginationMore from "../Common/PaginationMore";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const FilterContainer = ({
  data,
  totalElements,
  loadMore,
  hasMore,
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection,
}) => {
  // Add a check for data
  if (!data || !Array.isArray(data)) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          p: 2,
          bgcolor: "white",
          borderRadius: "8px",
          rowGap: "2rem",
          width: "100%",
          height: "100%",
          minHeight: "50vh",
        }}
      >
        <div>No data available</div>
      </Box>
    );
  }

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
      {/* Sort options */}
      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm text-gray-500">{totalElements || 0} sản phẩm</span>
        <div className="relative">
          <select
            className="w-[180px] rounded-md border p-2"
            value={`${sortBy}-${sortDirection}`}
            onChange={(e) => {
              const [newSortBy, newSortDirection] = e.target.value.split("-");
              setSortBy(newSortBy);
              setSortDirection(newSortDirection);
            }}
          >
            <option value="">Sắp xếp</option>
            <option value="sold-desc">Phổ biến</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
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
  );
};

export default FilterContainer;
