import { IconButton, TextField } from "@mui/material";
import React, { memo, useState, useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BiX } from "react-icons/bi";
import { formatCurrency } from "../utils/format";
import { Link } from "react-router-dom";
import { apiCreateCart, apiUpdateCart } from "../services";
import * as actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";

const CartItem = ({ data, setAlert, setTotalAmount, setProductSelect }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { username } = useSelector((state) => state.auth);
  const [quantity, setQuantity] = useState(data?.quantity);
  const [total, setTotal] = useState(data?.product?.price * quantity);

  const imageArray = data?.product?.images ? JSON.parse(data?.product?.images.replace(/'/g, '"')) : [];
  const firstImage = imageArray[0] ? imageArray[0] : null;

  const minQuantity = 1;
  const maxQuantity = data?.product.stockQuantity;

  useEffect(() => {
    if (quantity !== data?.quantity) {
      handleCreateCart(quantity, data?.product?.id);
    }
  }, [quantity]);

  useEffect(() => {
    setTotal(data?.product?.price * quantity);
  }, [quantity, data?.product?.price]);

  const handleCreateCart = async (quantity) => {
    try {
      const response = await apiCreateCart({
        username: username,
        cartDetail: {
          quantity: quantity,
          productId: data?.product?.id,
        },
      });
      console.log(response);
      if (response?.code === 0) {
        dispatch(actions.getCart(username));
      }
    } catch (error) {
      setAlert("Lỗi!");
      setTimeout(() => setAlert(""), 5000);
    }
  };

  const handleIncrease = () => {
    setQuantity((prev) => Math.min(prev + 1, maxQuantity));
  };

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(prev - 1, minQuantity));
  };
  console.log(quantity);

  return (
    <div className="flex">
      <div className="flex w-5/12 items-center gap-2 text-black">
        <input
          type="checkbox"
          name=""
          className="custom-checkbox h-4 w-4 text-blue-500 transition duration-150 ease-in-out"
        />
        <Link to={`/product/id/${data?.product?.id}`}>
          <div className="flex w-full flex-col items-center justify-start gap-2 grid-md:flex-row">
            <img
              src={
                firstImage && firstImage.startsWith("https://")
                  ? firstImage
                  : process.env.REACT_APP_SERVER_URL + firstImage
              }
              alt={data?.product?.name}
              className="h-full min-h-20 w-3/12 min-w-20 object-cover"
            />
            <p className="line-clamp-4 w-8/12 text-xs grid-md:line-clamp-2 grid-md:text-sm grid-lg:text-base">
              {data?.product?.name}
            </p>
          </div>
        </Link>
      </div>
      <div className="flex w-6/12 flex-col items-center justify-center gap-y-4 grid-md:flex-row">
        <div className="flex w-full items-center justify-center">
          <p className="text-xs font-semibold grid-md:text-sm grid-lg:text-base">
            {formatCurrency(data?.product?.price)}
          </p>
        </div>
        <div className="flex w-full items-center justify-center">
          <div className="flex items-center gap-1">
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
                width: "50px",
                "& .MuiInputBase-input": {
                  width: "60px",
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
          <p className="text-sm font-semibold text-red-500 grid-md:text-base grid-lg:text-lg">
            {formatCurrency(total)}
          </p>
        </div>
      </div>
      <div className="flex w-1/12 items-center justify-center">
        <BiX
          onClick={""}
          className="h-6 w-6 cursor-pointer rounded-full ease-in-out hover:bg-gray-200 hover:duration-300"
        />
      </div>
    </div>
  );
};

export default memo(CartItem);
