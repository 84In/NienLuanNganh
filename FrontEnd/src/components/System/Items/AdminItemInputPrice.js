import { FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import React from "react";

const AdminItemInputPrice = ({ errorPrice, price, validPrice }) => {
  return (
    <FormControl
      fullWidth
      size="small"
      sx={{
        backgroundColor: "white",
        "& .MuiOutlinedInput-root": {
          backgroundColor: "white",
        },
        "& .MuiInputLabel-root": {
          fontSize: "18px",
          fontWeight: "bold",
        },
      }}
      error={errorPrice} // Đánh dấu trường input bị lỗi
    >
      <InputLabel htmlFor="outlined-adornment-amount">Giá *</InputLabel>
      <OutlinedInput
        id="outlined-adornment-amount"
        startAdornment={<InputAdornment position="start">VNĐ</InputAdornment>}
        label="Giá"
        value={price}
        onChange={(e) => validPrice(e)}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        required
      />
      {errorPrice && <FormHelperText>Chỉ được nhập số.</FormHelperText>}
    </FormControl>
  );
};

export default AdminItemInputPrice;
