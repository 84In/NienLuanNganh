import React, { memo, useState } from "react";
import { Button, Box, IconButton, TextField } from "@mui/material";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { formatCurrency } from "../../utils/format";

const Purchase = ({ price }) => {
  const [quantity, setQuantity] = useState(1);
  const minQuantity = 1;
  const maxQuantity = 50;

  const handleIncrease = () => {
    setQuantity((prevQuantity) => Math.min(prevQuantity + 1, maxQuantity));
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, minQuantity));
  };

  return (
    <Box className="h-auto w-full rounded-lg bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="mr-2">Số Lượng</h1>
        <div className="flex gap-1">
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
      <h1 className="mb-4">
        Tạm tính: <span className="text-error-color text-xl font-semibold">{formatCurrency(price * quantity)}</span>
      </h1>
      <div className="flex w-full flex-col gap-2 py-2">
        <Button variant="contained" color="error" size="large" fullWidth className="mb-2">
          Mua ngay
        </Button>
        <Button variant="outlined" color="primary" size="large" fullWidth className="mb-2">
          Thêm vào giỏ
        </Button>
      </div>
    </Box>
  );
};

export default memo(Purchase);
