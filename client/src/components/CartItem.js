import { IconButton, TextField } from "@mui/material";
import React, { memo, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { formatCurrency } from "../utils/format";

const product1 = require("../assets/images/product/product1.png");

const CartItem = () => {
  const [quantity, setQuantity] = useState(1);

  const minQuantity = 1;
  const maxQuantity = 50;
  const price = 180000;

  const handleIncrease = () => {
    setQuantity((prevQuantity) => Math.min(prevQuantity + 1, maxQuantity));
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, minQuantity));
  };

  return (
    <div className="flex">
      <div className="flex w-5/12 items-center gap-2 text-black">
        <input type="checkbox" name="" className="h-4 w-4 text-blue-500 transition duration-150 ease-in-out" />
        <div className="flex w-full flex-col items-center justify-start gap-1 grid-md:flex-row">
          <img
            src={product1}
            alt="Điện thoại AI Samsung Galaxy S24 Ultra, Camera 200MP Zoom 100x, S Pen - Hàng Chính Hãng"
            className="h-full min-h-20 w-3/12 min-w-20 object-cover"
          />
          <p
            className="w-8/12 text-sm grid-md:text-base"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: window.innerWidth < 900 ? 4 : 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Điện thoại Samsung Galaxy S24 Ultra, Camera 200MP Zoom 100x, S Pen - Hàng Chính Hãng
          </p>
        </div>
      </div>
      <div className="flex w-6/12 flex-col items-center justify-center gap-y-4 grid-md:flex-row">
        <div className="flex w-full items-center justify-center">
          <p className="text-base font-semibold grid-md:text-base">{formatCurrency(price)}</p>
        </div>
        <div className="flex w-full items-center justify-center">
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
                  boxSizing: "none",
                  paddingRight: "1px",
                  textAlign: "center",
                  MozAppearance: "textfield",
                  WebkitAppearance: "none",
                },
              }}
              sx={{
                width: "50px",
                "& .MuiInputBase-input": {
                  width: "60px",
                  height: "15px",
                  boxSizing: "unset",
                  // padding: "8.5px 14px",
                },
              }}
            />
            <IconButton className="hidden grid-md:block" onClick={handleIncrease} size="small">
              <AiOutlinePlus />
            </IconButton>
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <p className="text-lg font-semibold text-red-500">{formatCurrency(price * quantity)}</p>
        </div>
      </div>
      <div className="flex w-1/12 items-center justify-center" onClick={""}>
        <BiTrash className="h-5 w-5" />
      </div>
    </div>
  );
};

export default memo(CartItem);
