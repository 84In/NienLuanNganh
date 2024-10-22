import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import { AlertCustom, CheckoutInfo, CheckoutItem, CheckoutSideBar } from "../../components";
import { path, paymentMethods, validDiscountPrice, validPrice, validPromotion, validTotalPrice } from "../../utils";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { userData, checkout } = useSelector((state) => state.user);

  const [totalDiscountPrice, setTotalDiscountPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [alert, setAlert] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  useEffect(() => {
    const calculateTotalAmount = () => {
      let discountPrice = 0;
      let total = 0;
      checkout?.forEach((item) => {
        if (item) {
          const quantity = item?.quantity;
          const promotion = validPromotion(item?.product?.promotions);
          const price = validPrice(item?.product?.price, promotion);
          const totalPrice = validTotalPrice(item?.product?.price, quantity, promotion);
          discountPrice += validDiscountPrice(item?.product?.price, promotion) || 0;
          total += totalPrice;
        }
      });
      setTotalDiscountPrice(discountPrice || 0);
      setTotalAmount(total || 0);
    };

    calculateTotalAmount();
  }, [checkout]);

  console.log(paymentMethod);
  console.log(checkout);

  return (
    <Grid2
      container
      rowGap={2}
      columnGap={"none"}
      sx={{ display: "flex", justifyContent: "space-between", width: "100%", paddingX: "1rem", height: "100%" }}
    >
      {alert && <AlertCustom title={"Thông báo"} content={alert} />}
      <Grid2 item container xs={12} lg={8.8} sx={{ display: "flex", gap: 2, alignContent: "flex-start" }}>
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
          }}
        >
          <div>
            <div className="mb-4 flex justify-between">
              <h1 className="text-lg font-semibold">Thông tin đơn hàng</h1>

              <Link to={path.HOME + path.CART}>
                <p className="text-blue-500">Thay đổi</p>
              </Link>
            </div>
            {!checkout || checkout?.length <= 0 ? (
              <div className="flex items-center justify-center px-4 py-10">Không có sản phẩm nào</div>
            ) : (
              <div className="gap-2 rounded-2xl border border-gray-600 p-2">
                <div className="custom-scrollbar flex max-h-[57vh] flex-col">
                  {checkout.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-2 grid-md:p-4">
                      <CheckoutItem data={item} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Grid2>
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
        >
          <div>
            <h1 className="mb-4 text-lg font-semibold">Hình thức thanh toán</h1>
            <div className="flex flex-col gap-4">
              {paymentMethods.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    id={item.name}
                    type="radio"
                    className="custom-radio cursor-pointer"
                    checked={item.name === paymentMethod}
                    onClick={() => setPaymentMethod(item.name)}
                    disabled={!checkout || checkout.length <= 0}
                  />
                  <label htmlFor={item.name} className="ml-2 flex cursor-pointer items-center gap-4">
                    <img src={item.image} alt={item.name} className="h-8 w-8 rounded-lg" />
                    <p>{item.title}</p>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid2>
      </Grid2>
      <Grid2
        item
        container
        xs={12}
        lg={3}
        sx={{ gap: 2, height: "fit-content", width: "100%", position: "sticky", top: "16px" }}
      >
        <Grid2 item xs={12}>
          <CheckoutInfo userData={userData} />
        </Grid2>
        <Grid2 item xs={12}>
          <CheckoutSideBar
            userData={userData}
            paymentMethod={paymentMethod}
            checkout={checkout}
            totalDiscountPrice={totalDiscountPrice}
            totalAmount={totalAmount}
            setAlert={setAlert}
          />
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default Checkout;
