import { Box, Button } from "@mui/material";
import React, { memo } from "react";
import { formatCurrency } from "../utils/format";

const CheckoutSideBar = ({ checkout, totalDiscountPrice, totalAmount }) => {
  return (
    <Box
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
      <div className="mb-4 flex items-center justify-between text-gray-600">
        <h1>Tạm tính:</h1> <span>{formatCurrency(totalDiscountPrice + totalAmount)}</span>
      </div>
      {totalDiscountPrice > 0 && (
        <div className="mb-4 flex items-center justify-between">
          <h1>Giảm:</h1> <span className="text-green-500">-{formatCurrency(totalDiscountPrice)}</span>
        </div>
      )}
      <hr className="mx-1 mb-4 border-gray-400" />
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-semibold">Thành tiền:</h1>{" "}
        <span className="text-xl font-semibold text-error-color">{formatCurrency(totalAmount)}</span>
      </div>
      <div className="flex w-full flex-col gap-2 py-2">
        <Button
          onClick={""}
          variant="contained"
          color="error"
          size="large"
          fullWidth
          className="mb-2"
          disabled={!checkout || checkout.length <= 0}
        >
          Thanh toán
        </Button>
      </div>
    </Box>
  );
};

export default memo(CheckoutSideBar);
