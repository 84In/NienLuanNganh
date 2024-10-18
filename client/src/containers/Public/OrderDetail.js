import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import { AlertCustom, ButtonCustom, CheckoutInfo } from "../../components";
import { apiGetOrderDetailById } from "../../services";
import { BiBlock, BiCheckCircle, BiSolidPackage } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import { Button } from "@mui/material";
import { formatCurrency, validTotalPrice } from "../../utils";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const OrderDetail = () => {
  const navigate = useNavigate();

  const [orderDetail, setOrderDetail] = useState({});
  const [orderId, setOrderId] = useState(window.location.pathname.split("/").pop() || "");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (orderId) {
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
      fetchOrderDetail();
    }
  }, [orderId]);

  const handleReviewProduct = (productId) => {};

  const handleCancle = () => {};

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
            {orderDetail?.status?.codeName === "pending" ? (
              <div className={`flex items-center gap-2 text-zinc-700`}>
                <BiSolidPackage className="h-5 w-5" />
                <span className="font-semibold">Chờ xác nhận</span>
              </div>
            ) : orderDetail?.status?.codeName === "shipping" ? (
              <div className={`flex items-center gap-2 text-blue-600`}>
                <FaShippingFast className="h-5 w-5" />
                <span className="font-semibold">Đang giao hàng</span>
              </div>
            ) : orderDetail?.status?.codeName === "canceled" ? (
              <div className={`flex items-center gap-2 text-red-600`}>
                <BiBlock className="h-5 w-5" />
                <span className="font-semibold">Đã hủy</span>
              </div>
            ) : (
              <div className={`flex items-center gap-2 text-green-600`}>
                <BiCheckCircle className="h-5 w-5" />
                <span className="font-semibold">Hoàn tất</span>
              </div>
            )}
          </div>
          <div className="mb-2 flex w-full flex-col items-start gap-2 p-2 text-sm grid-md:items-end grid-md:text-base">
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
                    <p>{orderDetail?.user?.firstName + " " + orderDetail?.user?.lastName}</p>
                    <span className="p-2 text-gray-200">|</span>
                    <p>{orderDetail?.user?.phone}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Địa chỉ: </span>
                    {orderDetail?.user?.address?.fullName}
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
            <div className="flex w-full border-b p-2">
              <div className="w-6/12 p-2">Sản phẩm</div>
              <div className="flex w-6/12 text-right">
                <div className="w-4/12 p-2">Đơn giá</div>
                <div className="w-4/12 p-2">Số lượng</div>
                <div className="w-4/12 p-2">Thành tiền</div>
              </div>
            </div>
            <div className="flex h-fit w-full flex-col gap-2 border-b p-2">
              {orderDetail?.orderDetails?.map((item, index) => (
                <div>
                  <div key={index} className="flex items-start">
                    <div className="flex w-6/12 p-2">
                      <div className="h-20 w-1/12 min-w-12 grid-md:min-w-20">
                        <img
                          src={JSON.parse(item?.product?.images.replace(/'/g, '"'))[0]}
                          alt={item?.product?.name + index}
                          className="h-20 w-16 object-contain"
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
                      <div className="flex w-6/12 flex-col text-right text-xs">
                        <div className="w-full p-2">{formatCurrency(item?.priceAtTime)}</div>
                        <div className="w-full p-2 text-gray-500">x{item?.quantity}</div>
                      </div>
                    ) : (
                      <div className="flex w-6/12 flex-row text-right">
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
                        sx={{ width: "100px" }}
                        onClick={() => handleReviewProduct(item?.product?.id)}
                      >
                        Đánh giá
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
                    onClick={handleCancle}
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
    </Grid2>
  );
};

export default OrderDetail;
