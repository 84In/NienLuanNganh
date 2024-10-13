import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useState } from "react";
import { AlertCustom, CheckoutSideBar } from "../../components";
import { paymentMethods } from "../../utils";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSelectPaymentMethod = () => {};

  console.log(paymentMethod);

  return (
    <Grid2
      container
      rowGap={2}
      columnGap={"none"}
      sx={{ display: "flex", justifyContent: "space-between", width: "100%", paddingX: "1rem", height: "100%" }}
    >
      {alert && <AlertCustom title={"Thông báo"} content={alert} />}
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
        >
          <div>
            <h1 className="text-lg font-semibold">Thông tin đơn hàng</h1>
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
            <h1 className="text-lg font-semibold">Hình thức thanh toán</h1>
            <div className="mt-4 flex flex-col gap-4">
              {paymentMethods.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    id={item.name}
                    type="radio"
                    className="custom-radio cursor-pointer"
                    checked={item.name === paymentMethod}
                    onClick={() => setPaymentMethod(item.name)}
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
      <Grid2 item container xs={12} md={3} sx={{ width: "100%" }}>
        <CheckoutSideBar totalAmount={""} />
      </Grid2>
    </Grid2>
  );
};

export default Checkout;
