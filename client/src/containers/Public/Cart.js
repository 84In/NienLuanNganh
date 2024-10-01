import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { Fragment, memo, useState, useEffect } from "react"; // Thêm useEffect
import { useSelector } from "react-redux";
import { CartItem, CartSideBar } from "../../components";

const Cart = () => {
  const { userData } = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900); // Thêm state để theo dõi kích thước màn hình

  const carts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const minQuantity = 1;
  const maxQuantity = 50;
  const price = 180000;

  // Thêm useEffect để lắng nghe sự thay đổi kích thước cửa sổ
  useEffect(() => {
    const handleIncrease = () => {
      setQuantity((prevQuantity) => Math.min(prevQuantity + 1, maxQuantity));
    };

    const handleDecrease = () => {
      setQuantity((prevQuantity) => Math.max(prevQuantity - 1, minQuantity));
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
            display: "flex",
            flexDirection: "column",
            p: 2,
            gap: 2,
            bgcolor: "white",
            borderRadius: "8px",
            width: "100%",
            height: "fit-content",
            maxHeight: "100vh",
          }}
          className=""
        >
          <h1 className="text-lg font-semibold">Giỏ hàng</h1>
          <div className="text flex font-semibold">
            <div className="flex w-5/12 items-center gap-2 text-black">
              <input
                type="checkbox"
                name=""
                className="custom-checkbox h-4 w-4 text-blue-500 transition duration-150 ease-in-out"
              />
              <p>Tất cả</p>
            </div>
            {isMobile ? ( // Sử dụng state isMobile để điều chỉnh giao diện
              <div className="flex w-6/12 flex-col">
                <div className="flex w-full">
                  <div className="flex w-6/12 items-center justify-center">Đơn giá</div>
                  <p>x</p>
                  <div className="flex w-6/12 items-center justify-center">Số lượng</div>
                </div>
                <hr className="mx-4" />
                <div className="flex w-full items-center justify-center">Thành tiền</div>
              </div>
            ) : (
              <div className="flex w-6/12">
                <div className="flex w-4/12 items-center justify-center">Đơn giá</div>
                <p>x</p>
                <div className="flex w-4/12 items-center justify-center">Số lượng</div>
                <p>=</p>
                <div className="flex w-4/12 items-center justify-center">Thành tiền</div>
              </div>
            )}
            <div className="flex w-1/12 items-center justify-center"></div>
          </div>
          <div className="custom-scrollbar flex flex-col gap-4">
            {carts.map((item, index) => (
              <div key={index}>
                <CartItem />
                {index !== carts.length - 1 && (
                  <hr className="mt-2 flex h-[1px] w-full items-center justify-center bg-gray-500 px-4" />
                )}
              </div>
            ))}
          </div>
        </Grid2>
      </Grid2>
      <Grid2 item container xs={12} md={3} sx={{ width: "100%" }}>
        <CartSideBar />
      </Grid2>
    </Grid2>
  );
};

export default memo(Cart);
