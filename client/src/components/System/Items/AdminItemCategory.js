import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const AdminItemCategory = ({ category_id, categories, handleChangeCategory }) => {
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

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <FormControl
        className="relative"
        sx={{
          "& .MuiInputLabel-root": {
            fontSize: "18px",
            fontWeight: "bold",
          },
        }}
        fullWidth
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-amount" shrink>
          Loại sản phẩm *
        </InputLabel>
        <Select
          labelId="categories-label"
          id="category-select"
          value={category_id ? category_id : ""}
          size="small"
          variant="outlined"
          onChange={(e) => handleChangeCategory(e)}
          required
          label="Loại sản phẩm *"
          notched // Phải thêm label này để kết nối với InputLabel
          sx={{
            ...cssField,
            padding: "8px",
            height: "40px",
            borderRadius: "6px",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#115293", // Màu khi hover
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1976d2", // Màu khi focus
            },
          }}
        >
          <MenuItem
            value=""
            sx={{
              fontSize: "16px", // Kích thước chữ cho các item
              textAlign: "center", // Căn giữa chữ trong MenuItem
              display: "flex",
              alignItems: "center", // Căn giữa theo chiều dọc
            }}
          >
            ---------
          </MenuItem>
          {categories?.content &&
            categories?.content.map((item, index) => {
              return (
                <MenuItem
                  key={index}
                  value={item?.id}
                  sx={{
                    fontSize: "16px", // Kích thước chữ cho các item
                    textAlign: "center", // Căn giữa chữ trong MenuItem
                    display: "flex",
                    alignItems: "center", // Căn giữa theo chiều dọc
                  }}
                >
                  {item?.name}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </div>
  );
};

export default AdminItemCategory;
