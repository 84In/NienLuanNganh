import { Box } from "@mui/material";
import React, { useState } from "react";
import { formatCurrency } from "../../utils";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const prices = {
  title: "Giá",
  name: "price",
  field: [
    {
      label: `0 - ${formatCurrency(1000000)}`,
      value: "0-1000000",
    },
    {
      label: `1.000.000 - ${formatCurrency(5000000)}`,
      value: "1000000-5000000",
    },
    {
      label: `5.000.000 - ${formatCurrency(10000000)}`,
      value: "5000000-10000000",
    },
    {
      label: `${formatCurrency(10000000)} trở lên`,
      value: "10000000-infinity",
    },
  ],
};

const FilterSideBar = ({ brands, brandFilter, priceFilter, setBrandFilter, setPriceFilter, onCategoryChange }) => {
  const { categories } = useSelector((state) => state.app);

  const handleFilterChange = (setFilter, value, isChecked) => {
    if (isChecked) {
      setFilter((prev) => [...prev, value]);
    } else {
      setFilter((prev) => prev.filter((item) => item !== value));
    }
  };

  return (
    <Box
      className="sticky top-4"
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
      <div className="custom-scrollbar max-h-80 overflow-y-auto scroll-smooth grid-md:max-h-screen grid-md:scrollbar-hide">
        <h1 className="p-1 text-center text-lg font-semibold">Danh mục</h1>
        {categories?.content && (
          <div>
            <p className="mb-2 font-semibold">Loại</p>
            <div className="flex flex-col gap-y-2">
              {categories?.content?.map((item, index) => (
                <Link
                  to={`/search/category/${item.codeName}`}
                  key={index}
                  onClick={() => onCategoryChange(`category`, item.codeName)}
                >
                  <div className="flex items-center">
                    <input
                      id={item.codeName}
                      type="radio"
                      className="custom-radio cursor-pointer"
                      checked={item.codeName === window.location.pathname.split("/")[3]}
                    />
                    <label htmlFor={item.codeName} className="ml-2 cursor-pointer">
                      {item.name}
                    </label>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        <h1 className="p-1 text-center text-lg font-semibold">Lọc</h1>
        {brands && brands.length > 0 && (
          <>
            <p className="mb-2 font-semibold">Thương hiệu</p>
            <div className="flex w-full flex-wrap gap-y-2">
              {brands.map((item, index) => (
                <div key={index} className="flex w-1/3 items-center grid-md:w-1/2">
                  <input
                    id={item.id}
                    value={item.id}
                    type="checkbox"
                    className="custom-checkbox"
                    checked={brandFilter.includes(item.id)}
                    onChange={(e) => handleFilterChange(setBrandFilter, item.id, e.target.checked)}
                  />
                  <label htmlFor={item.id} className="ml-2 line-clamp-1 cursor-pointer">
                    {item.name}
                  </label>
                </div>
              ))}
            </div>
          </>
        )}
        {prices && (
          <div>
            <p className="mb-2 font-semibold">{prices.title}</p>
            <div className="space-y-2">
              {prices.field.map((item, index) => (
                <div key={index} className="flex items-center">
                  <input
                    id={item.value}
                    type="checkbox"
                    className="custom-checkbox cursor-pointer"
                    checked={priceFilter.includes(item.value)}
                    onChange={(e) => handleFilterChange(setPriceFilter, item.value, e.target.checked)}
                  />
                  <label htmlFor={item.value} className="ml-2 cursor-pointer">
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Box>
  );
};

export default FilterSideBar;
