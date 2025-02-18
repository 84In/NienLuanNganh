// PaymentResult.js
import { Button } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { path } from "../../utils";

const PaymentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState(searchParams.get("status") || "");
  const [orderId, setOrderId] = useState(searchParams.get("orderId") || "");

  useEffect(() => {
    const status = paymentStatus;
    const order = orderId;

    if (status && order) {
      setPaymentStatus(status);
      setOrderId(order);
      setSearchParams({ status: status, orderId: order });
    } else {
      const params = new URLSearchParams(location.search);
      const newStatus = params.get("status");
      const newOrderId = params.get("orderId");

      if (newStatus && newOrderId) {
        setSearchParams({ status: newStatus, orderId: newOrderId });
        setPaymentStatus(newStatus);
        setOrderId(newOrderId);
      }
    }
  }, [location.search, searchParams, setSearchParams]);

  return (
    <Grid2
      container
      rowGap={2}
      columnGap={"none"}
      sx={{ display: "flex", justifyContent: "space-between", width: "100%", paddingX: "1rem", height: "100%" }}
    >
      <Grid2
        item
        xs={12}
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
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
        {paymentStatus === "success" ? (
          <div className="flex w-full min-w-[300px] max-w-[600px] flex-col items-center gap-4 rounded-md border p-4 shadow-md">
            <h1 className="text-center text-lg font-semibold text-blue-500">Thanh toán thành công</h1>
            <div className="text-center">
              <p>Mã: #{orderId}</p>
              <p>Đơn hàng của bạn đã được thanh toán. Vào đơn hàng để xem chi tiết.</p>
            </div>
            <div className="flex w-full items-center">
              <div className="w-6/12 p-2">
                <Button variant="outlined" size="medium" fullWidth onClick={() => navigate(path.HOME)}>
                  Về trang chủ
                </Button>
              </div>
              <div className="w-6/12 p-2">
                <Button
                  variant="outlined"
                  size="medium"
                  fullWidth
                  onClick={() => navigate(path.HOME + path.ORDER_HISTORY)}
                >
                  Thông tin đơn hàng
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex w-full min-w-[300px] max-w-[600px] flex-col items-center gap-4 rounded-md border p-4 shadow-md">
            <h1 className="text-center text-lg font-semibold text-red-500">Thanh toán thất bại</h1>
            <div className="text-center">
              <p>Mã: #{orderId}</p>
              <p>Đơn hàng của bạn chưa được thanh toán thành công. Vui lòng thử lại.</p>
            </div>
            <div className="flex w-full items-center">
              <div className="w-6/12 p-2">
                <Button variant="outlined" size="medium" fullWidth onClick={() => navigate(path.HOME)}>
                  Về trang chủ
                </Button>
              </div>
              <div className="w-6/12 p-2">
                <Button
                  variant="outlined"
                  size="medium"
                  fullWidth
                  onClick={() => navigate(path.HOME + path.ORDER_HISTORY)}
                >
                  Thông tin đơn hàng
                </Button>
              </div>
            </div>
          </div>
        )}
      </Grid2>
    </Grid2>
  );
};

export default PaymentResult;
