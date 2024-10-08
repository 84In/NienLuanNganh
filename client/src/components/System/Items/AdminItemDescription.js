import { TextField } from "@mui/material";
import React from "react";

const AdminItemDescription = ({ description, handleDescription }) => {
  return (
    <div className="flex w-full flex-col items-center justify-end gap-4">
      <TextField
        name="description"
        type="text"
        value={description}
        onChange={(e) => handleDescription(e)}
        variant="outlined"
        size="small"
        fullWidth
        className="bg-white"
        label="Thông tin mô tả" // Tên trường
        multiline // Cho phép nhập nhiều dòng
        rows={4} // Số dòng hiển thị
        InputLabelProps={{
          shrink: true,
          style: { fontSize: "18px", fontWeight: "bold" },
        }}
        required
      />
    </div>
  );
};

export default AdminItemDescription;
