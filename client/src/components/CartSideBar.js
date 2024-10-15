import { Box, Button } from "@mui/material";
import React, { memo } from "react";
import { formatCurrency } from "../utils/format";
import { useNavigate } from "react-router-dom";
import { path } from "../utils";

const CartSideBar = ({ selectedItems, totalAmount }) => {
  const navigate = useNavigate();

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
        height: "100%",
      }}
    >
      <div className="mb-4 flex items-center justify-between text-gray-600">
        <h1>Tạm tính:</h1> <span>{formatCurrency(totalAmount)}</span>
      </div>
      <hr className="mx-1 mb-4 border-gray-400" />
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-semibold">Thành tiền:</h1>{" "}
        <span className="text-xl font-semibold text-error-color">{formatCurrency(totalAmount)}</span>
      </div>
      <div className="flex w-full flex-col gap-2 py-2">
        <Button
          onClick={() => navigate(path.HOME + path.CHECKOUT)}
          variant="contained"
          color="error"
          size="large"
          fullWidth
          disabled={!selectedItems || selectedItems.length <= 0}
        >
          Thanh toán
        </Button>
      </div>
    </Box>
  );
};

export default memo(CartSideBar);
