import { Box, Button } from "@mui/material";
import React, { memo } from "react";
import { formatCurrency } from "../utils/format";

const CartSideBar = () => {
  const price = 180000;
  const quantity = 10;

  return (
    <Box
      className="sticky top-4"
      sx={{
        flexGrow: 1,
        p: 2,
        bgcolor: "white",
        borderRadius: "8px",
        gap: "2rem",
        width: "100%",
        height: "fit-content",
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-semibold">Tạm tính:</h1>{" "}
        <span className="text-xl font-semibold">{formatCurrency(price)}</span>
      </div>
      <hr className="mx-4 mb-4 border-gray-400" />
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-semibold">Tổng tiền:</h1>{" "}
        <span className="text-xl font-semibold text-error-color">{formatCurrency(price * quantity)}</span>
      </div>
      <div className="flex w-full flex-col gap-2 py-2">
        <Button onClick={""} variant="contained" color="error" size="large" fullWidth className="mb-2">
          Thanh toán
        </Button>
      </div>
    </Box>
  );
};

export default memo(CartSideBar);
