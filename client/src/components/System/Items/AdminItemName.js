import { TextField } from "@mui/material";
import React from "react";

const AdminItemName = ({ name, handleName }) => {
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
    <div className="flex w-full flex-col items-center justify-end gap-4">
      <TextField
        name="nameProduct"
        type="text"
        value={name}
        onChange={(e) => handleName(e)}
        variant="outlined"
        size="small" // Đặt kích thước thành small
        fullWidth
        className="bg-white"
        label="Tên sản phẩm"
        InputLabelProps={{
          shrink: true,
          style: { fontSize: "18px", fontWeight: "bold" }, // Chữ lớn và đậm
        }}
        required
        sx={{ backgroundColor: "white", ...cssField }} // Đảm bảo CSS tương ứng
      />
    </div>
  );
};

export default AdminItemName;