import { FormControl, FormHelperText, InputLabel, OutlinedInput } from "@mui/material";
import React from "react";

const AdminItemInputStock = ({ errorStockQuantity, stockQuantity, validStockQuantity }) => {
  return (
    <FormControl
      fullWidth
      sx={{
        backgroundColor: "white",
        "& .MuiOutlinedInput-root": {
          backgroundColor: "white",
          borderRadius: "4px", // Tùy chọn làm tròn góc
        },
        "& .MuiInputLabel-root": {
          fontSize: "18px",
          fontWeight: "bold",
        },
        "& .MuiInputLabel-shrink": {
          fontSize: "18px",
          fontWeight: "bold",
        },
      }}
      error={errorStockQuantity}
    >
      <InputLabel htmlFor="outlined-adornment-amount" shrink>
        Số lượng sản phẩm *
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-amount"
        label="Số lượng sản phẩm *"
        value={stockQuantity}
        size="small"
        onChange={(e) => validStockQuantity(e)}
        notched // Tạo khoảng trống cho label khi ở trạng thái thu nhỏ
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        required
      />
      {errorStockQuantity && <FormHelperText>Chỉ được nhập số.</FormHelperText>}
    </FormControl>
  );
};

export default AdminItemInputStock;
