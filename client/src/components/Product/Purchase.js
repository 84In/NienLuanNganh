import React, { memo } from "react";
import { Button, Box, IconButton, TextField } from "@mui/material";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { formatCurrency } from "../../utils/format";

const Purchase = ({ price, quantity, setQuantity }) => {
  const minQuantity = 1;
  const maxQuantity = 50;

  const handleIncrease = () => {
    setQuantity((prevQuantity) => Math.min(prevQuantity + 1, maxQuantity));
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, minQuantity));
  };

  const handleAddToCart = () => {};

  const handleBuyNow = () => {};

  return (
    <Box
      className="sticky top-4"
      sx={{
        flexGrow: 1,
        p: 2,
        bgcolor: "white",
        borderRadius: "8px",
        gap: 2,
        width: "100%",
        height: "fit-content",
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-semibold">Giá:</h1> <span className="text-xl font-semibold">{formatCurrency(price)}</span>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-semibold">Số Lượng</h1>
        <div className="flex items-center gap-1">
          <IconButton onClick={handleDecrease} size="small">
            <AiOutlineMinus />
          </IconButton>
          <TextField
            value={quantity}
            onChange={(e) => {
              const value = Math.min(Math.max(minQuantity, parseInt(e.target.value) || minQuantity), maxQuantity);
              setQuantity(value);
            }}
            type="number"
            size="small"
            inputProps={{
              min: minQuantity,
              max: maxQuantity,
              style: {
                paddingRight: "5px",
                textAlign: "center",
                MozAppearance: "textfield",
                WebkitAppearance: "none",
              },
            }}
            sx={{
              width: "60px",
              margin: "0 8px",
              "& .MuiInputBase-input": {
                width: "60px",
                padding: "8.5px 14px",
              },
            }}
          />
          <IconButton onClick={handleIncrease} size="small">
            <AiOutlinePlus />
          </IconButton>
        </div>
      </div>
      <hr className="mx-4 mb-4 border-gray-400" />
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-semibold">Tạm tính:</h1>{" "}
        <span className="text-xl font-semibold text-error-color">{formatCurrency(price * quantity)}</span>
      </div>
      <div className="flex w-full flex-col gap-2 py-2">
        <Button onClick={handleBuyNow} variant="contained" color="error" size="large" fullWidth className="mb-2">
          Mua ngay
        </Button>
        <Button onClick={handleAddToCart} variant="outlined" color="primary" size="large" fullWidth className="mb-2">
          Thêm vào giỏ
        </Button>
      </div>
    </Box>
  );
};

export default memo(Purchase);
