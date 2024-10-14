import { Box, Button } from "@mui/material";
import React, { memo } from "react";
import { formatCurrency } from "../utils/format";
import { apiCreateOrder } from "../services";
import { path, validPrice, validPromotion } from "../utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import actionTypes from "../store/actions/actionType";
import * as actions from "../store/actions";

const CheckoutSideBar = ({ userData, paymentMethod, checkout, totalDiscountPrice, totalAmount, setAlert }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    if (!userData?.address?.fullName || userData?.address?.fullName === "") {
      setAlert("Vui lòng điền địa chỉ trước khi thanh toán");
      setTimeout(() => {
        setAlert("");
      }, 5000);
      return;
    }
    if (!paymentMethod) {
      setAlert("Vui lòng chọn phương thức thanh toán");
      setTimeout(() => {
        setAlert("");
      }, 5000);
      return;
    }
    try {
      const orderDetails = checkout.map((item) => {
        const promotion = validPromotion(item?.product?.promotions);
        const price = validPrice(item?.product?.price, promotion);
        return {
          productId: item?.product?.id,
          priceAtTime: price,
          quantity: item?.quantity,
        };
      });

      const order = {
        shippingAddress: userData?.address?.fullName,
        totalAmount: totalAmount,
        paymentMethod: paymentMethod,
        orderDetails: orderDetails,
      };
      console.log(order);

      const response = await apiCreateOrder(paymentMethod, order);
      if (response?.code === 0) {
        setAlert("Thanh toán thành công");
        dispatch({ type: actionTypes.REMOVE_CHECKOUT });
        dispatch(actions.getCartCurrentUser());
        navigate(path.HOME + path.ORDER_HISTORY);
      }
      if (response?.code === 5) {
        setAlert("Sản phẩm không tồn tại ");
      }
      if (response?.code === 16) {
        setAlert("Sản phẩm đã hết");
      }
      setTimeout(() => {
        setAlert("");
      }, 5000);
    } catch (error) {
      setAlert("Lỗi!");
      setTimeout(() => {
        setAlert("");
      }, 5000);
    }
  };

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
          onClick={handleCheckout}
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
