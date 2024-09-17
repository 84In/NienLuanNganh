import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { memo } from "react";
import { GoSearch } from "react-icons/go";
import { OrderItem, SearchBar } from "../../components";

const product1 = require("../../assets/images/product/product1.png");

const OrderHistory = () => {
  const items = [
    {
      name: "Capo Musedo MC-02 - Bạc",
      price: 109000,
      quantity: 2,
      image: product1,
      status: "delivered",
    },
    {
      name: "Tay Cầm Chơi Game PC Đầu USB Có Rung,Joystick",
      price: 70999,
      quantity: 1,
      image: product1,
      status: "cancelled",
    },
  ];

  return (
    <Grid2
      container
      rowGap={2}
      columnGap={"none"}
      sx={{ display: "flex", justifyContent: "space-between", width: "100%", paddingX: "1rem", height: "100%" }}
    >
      <Grid2
        container
        sx={{
          flexGrow: 1,
          display: "flex",
          p: 2,
          bgcolor: "white",
          borderRadius: "8px",
          width: "100%",
          height: "fit-content",
        }}
      >
        <h1 className="mb-4 text-lg font-semibold">Đơn hàng của tôi</h1>
        <div className="w-full">
          <SearchBar IconBefore={GoSearch} TextContent={"Tìm đơn hàng"} Name={"order-search"} />
        </div>
        <div className="w-full space-y-6 px-0 py-4 grid-md:px-4 grid-md:py-4">
          {items.map((item, index) => (
            <OrderItem product={item} key={index} />
          ))}
        </div>
      </Grid2>
    </Grid2>
  );
};

export default memo(OrderHistory);
