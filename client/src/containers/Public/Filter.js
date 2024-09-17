import { Box, Button, Rating } from "@mui/material";
import React, { memo, useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { ProductCard, FilterSideBar } from "../../components";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

// Fake JSON data
const motorcycleData = [
  {
    id: 1,
    name: "Xe Máy Yamaha Janus Phiên Bản Tiêu Chuẩn Hoàn Toàn Mới Màu Mới",
    price: 28000000,
    image: "/placeholder.svg?height=200&width=300",
    rating: 5,
    sold: 4,
    brand: "Yamaha",
    color: "Đen",
  },
  {
    id: 2,
    name: "Xe Máy Yamaha NVX 155 - Phiên Bản DOXOU",
    price: 50950000,
    image: "/placeholder.svg?height=200&width=300",
    rating: 5,
    sold: 4,
    discount: 1,
    brand: "Yamaha",
    color: "Xanh dương",
  },
  {
    id: 3,
    name: "Xe Máy Yamaha PG1 hoặc PG 1 Chính Hãng Yamaha Việt Nam",
    price: 30049000,
    image: "/placeholder.svg?height=200&width=300",
    rating: 5,
    sold: 2,
    discount: 9,
    brand: "Yamaha",
    color: "Đỏ",
  },
  {
    id: 4,
    name: "Xe máy Yamaha Grande Hybrid Premium - Bản Đặc Biệt (6 màu)",
    price: 51250000,
    image: "/placeholder.svg?height=200&width=300",
    rating: 0,
    sold: 0,
    discount: 1,
    brand: "Yamaha",
    color: "Xanh lá",
  },
  {
    id: 5,
    name: "Xe Máy Honda Vision 2023",
    price: 32000000,
    image: "/placeholder.svg?height=200&width=300",
    rating: 4,
    sold: 10,
    brand: "Honda",
    color: "Đỏ",
  },
  {
    id: 6,
    name: "Xe Máy SYM Attila 50cc",
    price: 19900000,
    image: "/placeholder.svg?height=200&width=300",
    rating: 4,
    sold: 3,
    brand: "SYM",
    color: "Trắng",
  },
  {
    id: 7,
    name: "Xe Máy Espero Cruiser ES 150",
    price: 35000000,
    image: "/placeholder.svg?height=200&width=300",
    rating: 3,
    sold: 1,
    brand: "Espero",
    color: "Đen",
  },
  {
    id: 8,
    name: "Xe Máy Honda Air Blade 2023",
    price: 42000000,
    image: "/placeholder.svg?height=200&width=300",
    rating: 5,
    sold: 8,
    brand: "Honda",
    color: "Xanh dương",
  },
];

const Filter = () => {
  const [priceFilter, setPriceFilter] = useState([]);
  const [brandFilter, setBrandFilter] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);

  const handlePriceFilterChange = (value) => {
    setPriceFilter((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const handleBrandFilterChange = (value) => {
    setBrandFilter((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const handleColorFilterChange = (value) => {
    setColorFilter((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const filteredMotorcycles = motorcycleData.filter((motorcycle) => {
    const priceMatch =
      priceFilter.length === 0 ||
      priceFilter.some((range) => {
        const [min, max] = range.split("-").map(Number);
        return motorcycle.price >= min && (max ? motorcycle.price < max : true);
      });
    const brandMatch = brandFilter.length === 0 || brandFilter.includes(motorcycle.brand);
    const colorMatch = colorFilter.length === 0 || colorFilter.includes(motorcycle.color);
    return priceMatch && brandMatch && colorMatch;
  });

  return (
    <Grid2
      container
      rowGap={2}
      columnGap={"none"}
      sx={{ display: "flex", justifyContent: "space-between", width: "100%", paddingX: "1rem", height: "100%" }}
    >
      <Grid2 item xs={12} md={3}>
        <FilterSideBar />
      </Grid2>
      <Grid2 item xs={12} md={8.8}>
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
          {/* Top filters */}
          <div className="mb-6 flex flex-wrap gap-4">
            <div class="mb-6 flex flex-wrap gap-4">
              <div class="relative">
                <select class="w-[180px] rounded-md border p-2">
                  <option className="hidden" selected disabled>
                    Thương hiệu
                  </option>
                  <option value="yamaha">Yamaha</option>
                  <option value="espero">Espero</option>
                  <option value="honda">Honda</option>
                  <option value="sym">SYM</option>
                </select>
              </div>
              <div class="relative">
                <select class="w-[180px] rounded-md border p-2">
                  <option className="hidden" selected disabled>
                    Màu sắc
                  </option>
                  <option value="den">Đen</option>
                  <option value="xanh-duong">Xanh dương</option>
                  <option value="do">Đỏ</option>
                  <option value="xanh-la">Xanh lá</option>
                  <option value="trang">Trắng</option>
                </select>
              </div>
              <div class="relative">
                <select class="w-[180px] rounded-md border p-2">
                  <option className="hidden" selected disabled>
                    Nhà cung cấp
                  </option>
                  <option value="he-thong-xe-may">Hệ Thống Xe Máy Phúc</option>
                </select>
              </div>
              <Button
                variant="contained"
                color="primary"
                size="small"
                class="flex items-center rounded-md border px-4 py-2"
              >
                <BiFilterAlt className="mr-1 h-5 w-5" />
                Tất cả
              </Button>
            </div>
          </div>

          {/* Filter tags */}
          {/* <div className="mb-6 flex flex-wrap gap-4">
            <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-800">NOW Giao siêu tốc 2H</span>
            <span className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-800">TOP DEAL 15.9 Siêu rẻ</span>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">FREESHIP XTRA</span>
            <span className="flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800">
              <Rating />
            </span>
          </div> */}

          {/* Sort options */}
          <div className="mb-6 flex items-center justify-between">
            <span className="text-sm text-gray-500">Hiển thị {filteredMotorcycles.length} sản phẩm</span>
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredMotorcycles.map((product) => (
              <ProductCard {...product} />
            ))}
          </div>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default memo(Filter);
