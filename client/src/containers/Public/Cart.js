import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { memo, useState, useEffect } from "react"; // Thêm useEffect
import { useDispatch, useSelector } from "react-redux";
import { AlertCustom, CartItem, CartSideBar } from "../../components";
import { validPrice, validPromotion, validTotalPrice } from "../../utils";
import actionTypes from "../../store/actions/actionType";

const Cart = ({ setIsModelLogin }) => {
  const dispatch = useDispatch();
  const { cart, checkout } = useSelector((state) => state.user);

  const [alert, setAlert] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [selectedItems, setSelectedItems] = useState(checkout);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const calculateTotalAmount = () => {
      let total = 0;
      selectedItems?.forEach((item) => {
        if (item) {
          const quantity = item?.quantity;
          const promotion = validPromotion(item?.product?.promotions);
          const price = validPrice(item?.product?.price, promotion);
          const totalPrice = validTotalPrice(item?.product?.price, promotion, quantity);
          total += totalPrice;
        }
      });
      setTotalAmount(total);
    };

    calculateTotalAmount();
  }, [selectedItems, cart.cartDetails]);

  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      setSelectedItems((prev) => {
        const allProduct = cart.cartDetails;
        dispatch({ type: actionTypes.CREATE_CHECKOUT, checkout: allProduct });
        return allProduct;
      });
    } else {
      setSelectedItems((prev) => {
        const allProduct = [];
        dispatch({ type: actionTypes.REMOVE_CHECKOUT });
        return allProduct;
      });
    }
  };

  const handleSelectItem = (productId, isChecked) => {
    if (isChecked) {
      setSelectedItems((prev) => {
        const item = cart.cartDetails.find((item) => item.product.id === productId);
        if (!prev.some((selectedItem) => selectedItem.product.id === productId)) {
          const newSelectedItems = [...prev, item];
          dispatch({ type: actionTypes.CREATE_CHECKOUT, checkout: newSelectedItems });
          return newSelectedItems;
        }
        return prev;
      });
    } else {
      setSelectedItems((prev) => {
        const newSelectedItems = prev.filter((item) => item.product.id !== productId);
        dispatch({ type: actionTypes.CREATE_CHECKOUT, checkout: newSelectedItems });
        return newSelectedItems;
      });
    }
  };

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
            maxHeight: "100vh",
          }}
          className=""
        >
          <h1 className="text-lg font-semibold">Giỏ hàng</h1>
          <div className="text flex font-semibold">
            <div className="flex w-5/12 items-center gap-2 text-black">
              <input
                type="checkbox"
                name="selectAll"
                className="custom-checkbox h-4 w-4 text-blue-500 transition duration-150 ease-in-out"
                onChange={(e) => handleSelectAll(e.target.checked)}
                checked={
                  cart?.cartDetails &&
                  cart?.cartDetails.length !== 0 &&
                  selectedItems?.length === cart?.cartDetails?.length
                }
              />
              <p>Tất cả</p>
            </div>
            {isMobile ? (
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
          {cart?.cartDetails?.length <= 0 ? (
            <div className="flex items-center justify-center px-4 py-10">Không có sản phẩm nào</div>
          ) : (
            <div className="custom-scrollbar flex max-h-[27rem] flex-col gap-4">
              {cart?.cartDetails?.map((item, index) => (
                <div key={index}>
                  <CartItem
                    key={item?.product?.id}
                    cartId={cart?.id}
                    data={item}
                    setAlert={setAlert}
                    selectedItems={selectedItems}
                    setTotalAmount={setTotalAmount}
                    setSelectedItems={setSelectedItems}
                    isSelected={selectedItems.includes(item)}
                    onSelectItem={handleSelectItem}
                  />
                  {index !== cart?.cartDetails?.length - 1 && (
                    <div className="mx-auto h-[1px] w-[95%]">
                      <hr className="mt-2 h-[1px] bg-gray-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Grid2>
      </Grid2>
      <Grid2 item container xs={12} lg={3} sx={{ width: "100%" }}>
        <CartSideBar selectedItems={selectedItems} totalAmount={totalAmount} />
      </Grid2>
    </Grid2>
  );
};

export default memo(Cart);
