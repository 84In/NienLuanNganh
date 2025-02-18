import { IconButton, TextField } from "@mui/material";
import React, { memo, useState, useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BiX } from "react-icons/bi";
import { formatCurrency } from "../../utils/format";
import { Link } from "react-router-dom";
import { apiCreateCart, apiDeleteCartDetailInCart } from "../../services";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { validDiscountPrice, validPrice, validPromotion, validTotalPrice } from "../../utils";
import actionTypes from "../../store/actions/actionType";

const CartItem = ({
  cartId,
  data,
  setAlert,
  setTotalAmount,
  selectedItems,
  setSelectedItems,
  isSelected,
  onSelectItem,
}) => {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.auth);
  const [quantity, setQuantity] = useState(data?.quantity);

  const imageArray = data?.product?.images ? JSON.parse(data?.product?.images.replace(/'/g, '"')) : [];
  const firstImage = imageArray[0] ? imageArray[0] : null;
  const minQuantity = data?.product.stockQuantity ? 1 : 0;
  const maxQuantity = data?.product.stockQuantity ? data?.product.stockQuantity : 0;
  const promotion = validPromotion(data?.product?.promotions);
  const price = validPrice(data?.product?.price, promotion);
  const totalPrice = validTotalPrice(data?.product?.price, quantity, promotion);

  useEffect(() => {
    if (quantity !== data?.quantity) {
      handleCreateCart(quantity, data?.product?.id);
    }
  }, [quantity]);

  const handleCreateCart = async (newQuantity) => {
    try {
      const response = await apiCreateCart({
        username: username,
        cartDetail: {
          quantity: newQuantity,
          productId: data?.product?.id,
        },
      });
      if (response?.code === 0) {
        dispatch(actions.getCart(username));

        // Cập nhật lại số lượng trong selectedItems
        setSelectedItems((prev) => {
          const updatedItems = prev.map((item) =>
            item.product.id === data?.product?.id ? { ...item, quantity: newQuantity } : item,
          );
          dispatch({ type: actionTypes.CREATE_CHECKOUT, checkout: updatedItems });
          return updatedItems;
        });
      }
    } catch (error) {
      setAlert("Lỗi!");
    }
  };

  const handleDeleteCartDetailInCart = async () => {
    try {
      const response = await apiDeleteCartDetailInCart({
        cartId: cartId,
        productId: data?.product?.id,
      });
      if (response?.code === 0) {
        dispatch(actions.getCart(username));
        setAlert("Xóa sản phẩm thành công");
      }
    } catch (error) {
      setAlert("Lỗi!");
    }
  };

  const handleIncrease = () => {
    setQuantity((prev) => Math.min(prev + 1, maxQuantity));
  };

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(prev - 1, minQuantity));
  };

  return (
    <div className="flex">
      <div className="flex w-4 items-center justify-center">
        <input
          type="checkbox"
          name={data?.product?.id}
          className={`custom-checkbox h-4 w-4 transition duration-150 ease-in-out ${maxQuantity <= 0 ? "cursor-not-allowed opacity-50" : "text-blue-500"}`}
          checked={isSelected || selectedItems.some((item) => item.product.id === data?.product?.id)}
          onChange={(e) => maxQuantity > 0 && onSelectItem(data?.product?.id, e.target.checked)}
          disabled={maxQuantity <= 0}
        />
      </div>
      <div className="w-5/12 items-center gap-2 px-2 text-black">
        <Link to={`/product/id/${data?.product?.id}`}>
          <div className="flex w-full flex-col items-center justify-start gap-2 grid-md:flex-row">
            <div className="flex w-3/12 items-center justify-center">
              <img
                src={
                  firstImage && firstImage.startsWith("https://")
                    ? firstImage
                    : (process.env.NODE_ENV === "production"
                        ? process.env.REACT_APP_SERVER_URL_PROD
                        : process.env.REACT_APP_SERVER_URL_DEV) + firstImage
                }
                alt={data?.product?.name}
                className="max-h-20 min-h-20 min-w-20 max-w-20 object-contain grid-md:min-w-16 grid-lg:min-w-20"
              />
            </div>
            <div className="w-9/12 text-center text-xs grid-md:text-sm grid-lg:text-base">
              <p className="line-clamp-4 w-full grid-md:line-clamp-2 grid-md:text-left">{data?.product?.name}</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex w-6/12 flex-col items-center justify-center gap-y-4 grid-md:flex-row">
        {promotion ? (
          <div className="flex w-full flex-col items-center">
            <p className="text-sm font-semibold text-red-500">{formatCurrency(price)}</p>
            <p className="text-xs text-gray-500 line-through">{formatCurrency(data?.product?.price)}</p>
          </div>
        ) : (
          <div className="flex w-full items-center justify-center">
            <p className="text-sm font-semibold">{formatCurrency(price)}</p>
          </div>
        )}
        <div className="flex w-full items-center justify-center">
          <div className="flex h-full items-center gap-1">
            <IconButton onClick={handleDecrease} size="small">
              <AiOutlineMinus />
            </IconButton>
            <TextField
              value={quantity}
              onChange={(e) => {
                const newQuantity = Math.min(
                  Math.max(minQuantity, parseInt(e.target.value) || minQuantity),
                  maxQuantity,
                );
                setQuantity(newQuantity);
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
                width: "68px",
                "& .MuiInputBase-input": {
                  width: "65px",
                  height: "15px",
                  boxSizing: "unset",
                },
              }}
            />
            <IconButton className="hidden grid-md:block" onClick={handleIncrease} size="small">
              <AiOutlinePlus />
            </IconButton>
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <p className="text-sm font-semibold text-red-500 grid-md:text-sm grid-lg:text-base">
            {formatCurrency(totalPrice)}
          </p>
        </div>
      </div>
      <div className="flex w-1/12 items-center justify-center">
        <BiX
          onClick={handleDeleteCartDetailInCart}
          className="h-7 w-7 cursor-pointer rounded-full ease-in-out hover:bg-gray-200 hover:duration-300"
        />
      </div>
    </div>
  );
};

export default memo(CartItem);
