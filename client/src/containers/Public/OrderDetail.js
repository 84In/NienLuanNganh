import { Button } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import { BiBlock, BiCheckCircle, BiError, BiSolidPackage } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { AlertCustom, ButtonCustom, ConfirmAlert } from "../../components";
import { apiChangeOrderStatus, apiCreateReview, apiGetOrderDetailById } from "../../services";
import { formatCurrency, path, validTotalPrice } from "../../utils";
import { useSelector } from "react-redux";

const OrderDetail = () => {
  const { username } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [orderDetail, setOrderDetail] = useState({});
  const [orderId, setOrderId] = useState(window.location.pathname.split("/").pop() || "");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [alert, setAlert] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [payload, setPayload] = useState({
    rating: "",
    comment: "",
    username: username || "",
    productId: "",
    orderId: orderId || "",
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(0);
  console.log(payload);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetail();
    }
  }, [orderId]);

  const fetchOrderDetail = async () => {
    try {
      const response = await apiGetOrderDetailById(orderId);
      if (response.code === 0) {
        setOrderDetail(response?.result);
      }
    } catch (error) {
      setAlert("Lỗi!");
      setTimeout(() => {
        setAlert("");
      }, 5000);
    }
  };

  const handleCancelOrder = async () => {
    try {
      setConfirm(false);
      const response = await apiChangeOrderStatus(orderId, `cancelled`);
      if (response?.code === 0) {
        navigate(path.HOME + path.ORDER_HISTORY);
      }
    } catch (error) {
      setAlert("Lỗi!");
      setTimeout(() => {
        setAlert("");
      }, 5000);
    }
  };

  const handleReviewProduct = async (productId, product) => {
    setSelectedProduct(product);
    setPayload((prev) => ({ ...prev, productId }));
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setPayload((prev) => ({ ...prev, rating: newRating }));
  };

  const handleSubmitReview = async () => {
    if (selectedProduct && payload && rating > 0) {
      try {
        const response = await apiCreateReview(payload);
        if (response?.code === 0) {
          setAlert(`Cảm ơn bạn đã đánh giá sản phẩm của chúng tôi!`);
        }
        if (response.code === 18) {
          setAlert(`Đơn hàng không tồn tại!`);
        }
        if (response.code === 26) {
          setAlert(`Bạn đã đánh giá sản phẩm này trước đó`);
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
      setSelectedProduct(null);
      setRating(0);
      setPayload((prev) => ({ ...prev, rating: "", comment: "", productId: "" }));
      fetchOrderDetail();
    } else {
      setAlert("Vui lòng đánh giá sản phẩm trước khi gửi");
      setTimeout(() => {
        setAlert("");
      }, 5000);
    }
  };

  return (
    <Grid2
      container
      rowGap={2}
      columnGap={"none"}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        paddingX: "1rem",
        height: "100%",
        position: "relative",
      }}
    >
      {alert && <AlertCustom title={"Thông báo"} content={alert} />}

      <Grid2
        item
        container
        sx={{
          flexGrow: 1,
          display: "flex",
          p: 2,
          gap: 2,
          bgcolor: "white",
          borderRadius: "8px",
          width: "100%",
          height: "fit-content",
        }}
      >
        <div className="flex items-center text-lg">
          <ButtonCustom
            TypeButton={"button"}
            FontWeight={"font-medium"}
            HoverColor={"hover:bg-gray-200"}
            ClickButton={() => navigate(-1)}
            IconBefore={IoIosArrowBack}
            TextTitle={"Quay lại"}
          />
        </div>
        <div className="w-full">
          <div className="mb-2 flex w-full flex-col place-items-center items-start justify-between gap-2 p-2 text-base grid-md:flex-row grid-md:text-lg">
            <h1 className="text-lg font-semibold">Chi tiết đơn hàng #{orderDetail?.id}</h1>
            <div className="flex items-center gap-2">
              {orderDetail?.status?.codeName === "pending" ? (
                <div className={`flex items-center gap-2 text-zinc-700`}>
                  <BiSolidPackage className="h-5 w-5" />
                  <span className="text-sm font-semibold">Chờ xác nhận</span>
                </div>
              ) : orderDetail?.status?.codeName === "confirmed" ? (
                <div className={`flex items-center gap-2 text-blue-600`}>
                  <FaShippingFast className="h-5 w-5" />
                  <span className="text-sm font-semibold">Xác nhận</span>
                </div>
              ) : orderDetail?.status?.codeName === "cancelled" ? (
                <div className={`flex items-center gap-2 text-red-600`}>
                  <BiBlock className="h-5 w-5" />
                  <span className="text-sm font-semibold">Đã hủy</span>
                </div>
              ) : (
                <div className={`flex items-center gap-2 text-green-600`}>
                  <BiCheckCircle className="h-5 w-5" />
                  <span className="text-sm font-semibold">Hoàn tất</span>
                </div>
              )}
              {orderDetail?.payment?.status === "Success" &&
                (orderDetail?.status?.codeName === "pending" || orderDetail?.status?.codeName === "confirmed") && (
                  <>
                    <span className="text-gray-200">|</span>
                    <div className="text-sm text-gray-500"> Đã thanh toán</div>
                  </>
                )}
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-2 p-2 text-sm grid-md:items-end grid-md:text-base">
            <p>Ngày đặt hàng: {orderDetail?.createdAt?.replace("T", " ")}</p>
          </div>
        </div>
        <Grid2
          item
          container
          xs={12}
          sx={{ width: "100%", display: "flex", justifyContent: "space-between", columngap: 1, rowGap: 2 }}
        >
          <Grid2 item container xs={12} md={5.9} sx={{ width: "100%" }}>
            <div className="w-full rounded-md border p-4 text-sm shadow-md grid-md:text-base">
              <div className="mb-4 flex justify-between">
                <p className="font-semibold">Người nhận</p>
              </div>
              <hr className="mx-1 mb-4 border-gray-400" />
              {orderDetail && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 font-semibold">
                    <p>{orderDetail?.recipient?.fullName}</p>
                    <span className="p-2 text-gray-200">|</span>
                    <p>{orderDetail?.recipient?.phone}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Địa chỉ: </span>
                    {orderDetail?.recipient?.address}
                  </div>
                </div>
              )}
            </div>
          </Grid2>
          <Grid2 item container xs={12} md={5.9} sx={{ width: "100%" }}>
            <div className="w-full rounded-md border p-4 text-sm shadow-md grid-md:text-base">
              <div className="mb-4 flex justify-between">
                <p className="font-semibold">Phương thức thanh toán</p>
              </div>
              <hr className="mx-1 mb-4 border-gray-400" />
              <div>
                {orderDetail?.paymentMethod?.codeName === "cash" ? (
                  <p>Thanh toán bằng tiền mặt khi nhận hàng</p>
                ) : (
                  <p>Thanh toán bằng {orderDetail?.paymentMethod?.name}</p>
                )}
              </div>
            </div>
          </Grid2>
        </Grid2>
        <Grid2 item container xs={12} sx={{ width: "100%" }}>
          <div className="w-full rounded-md border shadow-md">
            {isMobile ? (
              <div className="flex w-full border-b p-2 text-sm">
                <div className="w-6/12 p-2">Sản phẩm</div>
                <div className="w-6/12 p-2 text-right">Đơn giá</div>
              </div>
            ) : (
              <div className="flex w-full border-b p-2">
                <div className="w-6/12 p-2">Sản phẩm</div>
                <div className="flex w-6/12 text-right">
                  <div className="w-4/12 p-2">Đơn giá</div>
                  <div className="w-4/12 p-2">Số lượng</div>
                  <div className="w-4/12 p-2">Thành tiền</div>
                </div>
              </div>
            )}
            <div className="flex h-fit w-full flex-col gap-2 border-b p-2">
              {orderDetail?.orderDetails?.map((item, index) => (
                <div>
                  <div key={index} className="flex items-start">
                    <div className="flex w-7/12 p-2 grid-md:w-6/12">
                      <div className="w-1/12 min-w-12 grid-md:min-w-20">
                        <img
                          src={
                            JSON.parse(item?.product?.images.replace(/'/g, '"'))[0].startsWith("https://")
                              ? JSON.parse(item?.product?.images.replace(/'/g, '"'))[0]
                              : (process.env.NODE_ENV === "production"
                                  ? process.env.REACT_APP_SERVER_URL_PROD
                                  : process.env.REACT_APP_SERVER_URL_DEV) +
                                JSON.parse(item?.product?.images.replace(/'/g, '"'))[0]
                          }
                          alt={item?.product?.name + index}
                          className="h-16 w-16 object-contain"
                        />
                      </div>
                      <div
                        className="ml-2 line-clamp-2 flex w-11/12 cursor-pointer flex-col gap-1"
                        onClick={() => navigate(`/product/id/${item?.product?.id}`)}
                      >
                        <p className="line-clamp-2 text-sm grid-md:text-base">{item?.product?.name}</p>
                      </div>
                    </div>
                    {isMobile ? (
                      <div className="flex w-5/12 flex-col text-right text-xs">
                        <div className="w-full p-2 font-semibold">{formatCurrency(item?.priceAtTime)}</div>
                        <div className="w-full p-2 text-gray-500">x{item?.quantity}</div>
                      </div>
                    ) : (
                      <div className="flex w-6/12 flex-row text-right text-sm">
                        <div className="w-4/12 p-2">{formatCurrency(item?.priceAtTime)}</div>
                        <div className="w-4/12 p-2">{item?.quantity}</div>
                        <div className="w-4/12 p-2">
                          {formatCurrency(validTotalPrice(item?.priceAtTime, item?.quantity))}
                        </div>
                      </div>
                    )}
                  </div>
                  {orderDetail?.status?.codeName === "completed" && (
                    <div>
                      <Button
                        variant="outlined"
                        color="warning"
                        sx={{ minWidth: "100px" }}
                        onClick={() => handleReviewProduct(item?.product?.id, item?.product)}
                        disabled={item?.reviewed === false ? false : true}
                      >
                        {item?.reviewed ? "Đã đánh giá" : "Đánh giá"}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex w-full items-center justify-between p-2">
              <div className="flex flex-col gap-2 p-2 grid-sm:flex-row">
                {orderDetail?.status?.codeName === "pending" && (
                  <Button
                    variant="outlined"
                    color="error"
                    size="large"
                    className="whitespace-nowrap"
                    sx={{ width: "100px" }}
                    onClick={() => setConfirm(true)}
                  >
                    Hủy
                  </Button>
                )}
              </div>
              <div className="p-2 text-right">
                <p className="text-sm text-gray-500">Tổng tiền:</p>
                <p className="text-lg font-semibold text-red-500 grid-md:text-xl">
                  {formatCurrency(orderDetail?.totalAmount)}
                </p>
              </div>
            </div>
          </div>
        </Grid2>
      </Grid2>
      {confirm && (
        <ConfirmAlert
          icon={<BiError className="h-6 w-6 text-red-500" />}
          title={"Hủy đơn hàng"}
          content={"Bạn có muốn hủy đơn hàng đang chọn không?"}
          titleConfirm={"Xác nhận"}
          titleCancel={"Hủy"}
          onConfirm={handleCancelOrder}
          onCancel={() => setConfirm(false)}
        />
      )}
      {selectedProduct && (
        <div
          className="fixed bottom-0 left-0 right-0 top-0 z-40 flex h-full w-full content-center items-center justify-center p-4 shadow-md"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <div className="h-fit w-full min-w-[350px] max-w-[800px] flex-col rounded-md border bg-white p-6">
            <h1 className="mb-4 text-lg font-semibold">Đánh giá sản phẩm: {selectedProduct?.name}</h1>

            <div className="mb-4">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRatingChange(star)}
                    className={`text-4xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <textarea
              className="mb-4 w-full resize-none rounded border p-2"
              rows="5"
              placeholder="Nhập đánh giá của bạn..."
              value={payload.comment}
              onChange={(e) => setPayload((prev) => ({ ...prev, comment: e.target.value }))}
            />

            <div className="flex justify-end gap-2">
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setSelectedProduct(null);
                  setRating(0);
                  setPayload((prev) => ({ ...prev, rating: "", comment: "", productId: "" }));
                }}
              >
                Hủy
              </Button>
              <Button variant="contained" color="primary" onClick={handleSubmitReview}>
                Xác nhận
              </Button>
            </div>
          </div>
        </div>
      )}
    </Grid2>
  );
};

export default OrderDetail;
