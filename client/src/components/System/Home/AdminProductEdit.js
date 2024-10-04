import { Button } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const cssField = {
  backgroundColor: "#fff", // Màu nền của Select
  borderRadius: "8px", // Bo góc
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E2E8F0", // Màu viền mặc định
    },
    "&:hover fieldset": {
      borderColor: "#3182CE", // Màu viền khi hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#3182CE", // Màu viền khi focus
    },
  },
};

const AdminProductEdit = ({ product }) => {
  const [data, setData] = useState({
    name: null,
    description: null,
    price: null,
    stock_quantity: null,
    images: null,
    category_id: null,
    brand_id: null,
  });
  const [files, setFiles] = useState(null);

  useEffect(() => {
    if (product) {
      setData(product);
    }
  }, [product]);

  console.log(data);

  const CSS_HEADING = "font-bold text-2xl";
  return (
    <div className="flex flex-col">
      <div className="flex w-full items-center justify-center">
        {product ? (
          <span className={CSS_HEADING}>Cập nhật sản phẩm</span>
        ) : (
          <span className={CSS_HEADING}>Tạo sản phẩm mới</span>
        )}
      </div>
      <div className="mt-2 flex flex-col items-center justify-center p-2">
        <div className="m-2 w-full rounded-md bg-gray-200 p-2">
          <span className="mb-2 text-xl font-semibold">Thông tin sản phẩm</span>
          <div>
            <Grid2 container className="pb-6">
              <Grid2
                padding={"10px"}
                justifyContent={"center"}
                alignItems={"center"}
                item
                xs={6}
                className="flex flex-col gap-3"
              >
                <div className="flex flex-col items-center justify-end gap-4">4</div>
                <div className="flex items-center justify-end gap-4">
                  <div className="flex items-center justify-center">1</div>
                  <div className="flex items-center justify-center">2</div>
                </div>
                <div className="flex flex-col items-center justify-end gap-4">4</div>
              </Grid2>
              <Grid2
                display={"flex"}
                className="flex-col gap-2 pb-2 pt-2"
                justifyContent={"start"}
                alignItems={"center"}
                item
                xs={6}
              >
                <div className="flex flex-col items-center justify-center gap-4">1</div>
                <div className="flex flex-col items-center justify-center gap-4">1</div>
                <div className="flex flex-col items-center justify-center gap-4">1</div>
              </Grid2>
            </Grid2>
          </div>
        </div>
        <div className="m-2 w-full rounded-md bg-gray-200 p-2">
          <span className="mb-2 text-xl font-semibold">Thông tin liên hệ</span>
          <div>
            <Grid2 container className="pb-6"></Grid2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductEdit;
