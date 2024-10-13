import React, { memo } from "react";
import { Button, Box, IconButton, TextField } from "@mui/material";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { formatCurrency } from "../../utils/format";
import { useDispatch, useSelector } from "react-redux";
import { apiUpdateCart } from "../../services";
import * as actions from "../../store/actions";
import { validPrice, validPromotion, validTotalPrice } from "../../utils/validator";

const Purchase = ({ product, quantity, setAlert, setQuantity, setIsModelLogin }) => {
  const dispatch = useDispatch();
  const { isLoggedIn, username } = useSelector((state) => state.auth);

  const minQuantity = 0;
  const maxQuantity = product?.stockQuantity ? product.stockQuantity : 0;
  const promotion = validPromotion(product?.promotions);
  const price = validPrice(product?.price, promotion);
  const totalPrice = validTotalPrice(product?.price, promotion, quantity);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => Math.min(prevQuantity + 1, maxQuantity));
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, minQuantity));
  };

  const handleBuyNow = async () => {
    if (!isLoggedIn) {
      setIsModelLogin(true);
      return;
    }
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      setIsModelLogin(true);
      return;
    }
    if (quantity <= 0) {
      setAlert("Vui lòng thêm số lượng");
      setTimeout(() => setAlert(""), 5000);
      return;
    }
    try {
      const response = await apiUpdateCart({
        username: username,
        cartDetail: {
          quantity: quantity,
          productId: product?.id,
        },
      });
      if (response?.code === 0) {
        dispatch(actions.getCart(username));
        setAlert("Đã thêm sản phẩm vào giỏ hàng");
        setTimeout(() => setAlert(""), 5000);
      }
    } catch (error) {
      setAlert("Lỗi!");
      setTimeout(() => setAlert(""), 5000);
    }
  };

  return (
    <Box
      className="sticky top-4"
      sx={{
        flexGrow: 1,
        p: 2,
        bgcolor: "white",
        borderRadius: "8px",
        gap: 2,
        width: "100%",
        height: "fit-content",
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h1>Giá:</h1> <span>{formatCurrency(price)}</span>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <h1>Số Lượng</h1>
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
                paddingRight: "5px",
                textAlign: "center",
                MozAppearance: "textfield",
                WebkitAppearance: "none",
              },
            }}
            sx={{
              width: "70px",
              "& .MuiInputBase-input": {
                width: "65px",
                height: "20px",
                boxSizing: "unset",
              },
            }}
          />
          <IconButton onClick={handleIncrease} size="small">
            <AiOutlinePlus />
          </IconButton>
        </div>
      </div>
      <hr className="mx-1 mb-4 border-gray-400" />
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-semibold">Tạm tính:</h1>{" "}
        <span className="text-xl font-bold text-error-color">{formatCurrency(totalPrice)}</span>
      </div>
      <div className="flex w-full flex-col gap-2 py-2">
        <Button onClick={handleBuyNow} variant="contained" color="error" size="large" fullWidth className="mb-2">
          Mua ngay
        </Button>
        <Button onClick={handleAddToCart} variant="outlined" color="primary" size="large" fullWidth className="mb-2">
          Thêm vào giỏ
        </Button>
      </div>
    </Box>
  );
};

export default memo(Purchase);
