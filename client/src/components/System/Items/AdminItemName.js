import { TextField } from "@mui/material";
import React from "react";

const AdminItemName = ({ name, handleName, nameLabel, helpText, disable, onKeyDown }) => {
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
        disabled={disable}
        className="bg-white"
        label={nameLabel ? nameLabel : "Tên sản phẩm"}
        InputLabelProps={{
          shrink: true,
          style: { fontSize: "18px", fontWeight: "bold" }, // Chữ lớn và đậm
        }}
        onKeyDown={onKeyDown}
        required
        sx={{ backgroundColor: "white", ...cssField }} // Đảm bảo CSS tương ứng
        helperText={helpText ? helpText : ""}
      />
    </div>
  );
};

export default AdminItemName;
