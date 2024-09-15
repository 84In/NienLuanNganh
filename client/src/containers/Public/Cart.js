import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import { CartItem, CartSideBar } from "../../components";

const Cart = () => {
  const { userData } = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(1);

  const carts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
    <Grid2
      container
      rowGap={2}
      columnGap={"none"}
      sx={{ display: "flex", justifyContent: "space-between", width: "100%", paddingX: "1rem", height: "100%" }}
    >
      <Grid2 item container xs={12} md={8.8} sx={{ display: "flex", gap: 2, alignContent: "flex-start" }}>
        <Grid2
          item
          xs={12}
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            p: 2,
            bgcolor: "white",
            borderRadius: "8px",
            width: "100%",
            height: "fit-content",
            maxHeight: "screen",
          }}
          className="text-gray-500"
        >
          <div className="flex w-5/12 items-center gap-2 text-black">
            <input
              type="checkbox"
              name=""
              className="custom-checkbox h-4 w-4 text-blue-500 transition duration-150 ease-in-out"
            />
            <p>Tất cả</p>
          </div>
          <div className="flex w-2/12 items-center justify-center">Đơn giá</div>
          <div className="flex w-2/12 items-center justify-center">Số lượng</div>
          <div className="flex w-2/12 items-center justify-center">Thành tiền</div>
          <div className="flex w-1/12 items-center justify-center"></div>
        </Grid2>
        <Grid2
          item
          xs={12}
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            p: 2,
            bgcolor: "white",
            borderRadius: "8px",
            gap: "2rem",
            width: "100%",
            height: "fit-content",
            maxHeight: "100vh",
          }}
          className="custom-scrollbar"
        >
          {carts.map((item, index) => (
            <>
              <CartItem key={index} />
              {carts.length - 1 !== index && (
                <hr className="flex h-[2px] w-full items-center justify-center bg-gray-400 px-4" />
              )}
            </>
          ))}
        </Grid2>
      </Grid2>
      <Grid2 item container xs={12} md={3} sx={{ width: "100%" }}>
        <CartSideBar />
      </Grid2>
    </Grid2>
  );
};

export default memo(Cart);
