import { Box } from "@mui/material";
import React, { useState } from "react";

const FilterSideBar = () => {
  const filters = [
    {
      title: "Thương hiệu",
      name: "Brand",
      field: [
        {
          label: "Yamaha",
          value: "yamaha",
        },
        {
          label: "Honda",
          value: "honda",
        },
        {
          label: "SYM",
          value: "sym",
        },
      ],
    },
    {
      title: "Màu sắc",
      name: "Color",
      field: [
        {
          label: "Đen",
          value: "den",
        },
        {
          label: "Xanh",
          value: "xanh",
        },
        {
          label: "Đỏ",
          value: "do",
        },
      ],
    },
    {
      title: "Giá",
      name: "Price",
      field: [
        {
          label: "0 - 500,000 VND",
          value: "0-500000",
        },
        {
          label: "500,000 - 1,000,000 VND",
          value: "500000-1000000",
        },
        {
          label: "1,000,000 - 2,000,000 VND",
          value: "1000000-2000000",
        },
        {
          label: "2,000,000 VND trở lên",
          value: "2000000-more",
        },
      ],
    },
  ];

  const [priceFilter, setPriceFilter] = useState([]);
  const [brandFilter, setBrandFilter] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);

  const handleFilterChange = (filterState, setFilterState, value) => {
    setFilterState((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
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
        {filters.map((filter, index) => (
          <div>
            <p className="mb-2 font-semibold">{filter.title}</p>
            <div className="space-y-2">
              {filter.field.map((e, i) => (
                <div key={e.value} className="flex items-center">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    id={e.value}
                    checked={
                      filter.name === "Brand"
                        ? brandFilter.includes(e.value)
                        : filter.name === "Color"
                          ? colorFilter.includes(e.value)
                          : priceFilter.includes(e.value)
                    }
                    onChange={() =>
                      handleFilterChange(
                        filter.name === "Brand" ? brandFilter : filter.name === "Color" ? colorFilter : priceFilter,
                        filter.name === "Brand"
                          ? setBrandFilter
                          : filter.name === "Color"
                            ? setColorFilter
                            : setPriceFilter,
                        e.value,
                      )
                    }
                  />
                  <label htmlFor={e.value} className="ml-2">
                    {e.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
        {/*         
        <div>
          <p className="mb-2 font-semibold">Màu sắc</p>
          <div className="space-y-2">
            {["Đen", "Xanh dương", "Đỏ", "Xanh lá", "Trắng"].map((color) => (
              <div key={color} className="flex items-center">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  id={color}
                  checked={colorFilter.includes(color)}
                  onCheckedChange={() => handleColorFilterChange(color)}
                />
                <label htmlFor={color} className="ml-2">
                  {color}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 font-semibold">Giá</p>
          <div className="space-y-2">
            {[
              { label: "0 - 500,000 VND", value: "0-500000" },
              { label: "500,000 - 1,000,000 VND", value: "500000-1000000" },
              { label: "1,000,000 - 2,000,000 VND", value: "1000000-2000000" },
              { label: "2,000,000 VND trở lên", value: "2000000-" },
            ].map((range) => (
              <div key={range.value} className="flex items-center">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  id={range.value}
                  checked={priceFilter.includes(range.value)}
                  onCheckedChange={() => handlePriceFilterChange(range.value)}
                />
                <label htmlFor={range.value} className="ml-2">
                  {range.label}
                </label>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </Box>
  );
};

export default FilterSideBar;
