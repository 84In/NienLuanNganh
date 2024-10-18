import { Button } from "@mui/material";
import React, { memo } from "react";
import { BiBlock, BiCheckCircle, BiCheckDouble, BiInfoCircle, BiSolidPackage } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/format";

const OrderItem = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2 rounded-lg bg-white p-2 shadow-md grid-md:p-4">
      <div className="mb-2 flex flex-col justify-between gap-2 p-2 grid-md:flex-row">
        {product?.status?.codeName === "pending" ? (
          <div className={`flex items-center gap-2 text-zinc-700`}>
            <BiSolidPackage className="h-5 w-5" />
            <span className="text-sm font-semibold">Chờ xác nhận</span>
          </div>
        ) : product?.status?.codeName === "shipping" ? (
          <div className={`flex items-center gap-2 text-blue-600`}>
            <FaShippingFast className="h-5 w-5" />
            <span className="text-sm font-semibold">Đang giao hàng</span>
          </div>
        ) : product?.status?.codeName === "canceled" ? (
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
        <div className="flex flex-col items-start gap-2 text-sm text-gray-500 grid-md:items-end">
          <p>Mã: {product?.id}</p>
          <p>Ngày đặt hàng: {product?.createdAt?.replace("T", " ")}</p>
        </div>
      </div>
      <hr className="mb-2 flex h-[1px] w-full items-center justify-center bg-gray-400 px-4" />
      <div className="custom-scrollbar flex max-h-[21rem] flex-col gap-4 px-2 py-4">
        {product?.orderDetails?.map((item, index) => (
          <div key={index} className="flex w-full items-start">
            <div className="w-1/12 min-w-12 grid-md:min-w-20">
              <img
                src={JSON.parse(item?.product?.images.replace(/'/g, '"'))[0]}
                alt={item?.product?.name + index}
                className="h-16 w-16 object-contain"
              />
            </div>
            <div
              className="ml-2 flex w-6/12 cursor-pointer flex-col gap-1 grid-md:w-7/12"
              onClick={() => navigate(`/product/id/${item?.product?.id}`)}
            >
              <p className="line-clamp-2 text-sm grid-md:text-base">{item?.product?.name}</p>
            </div>
            <div className="w-5/12 text-right align-middle grid-md:w-4/12">
              <p className="text-xs font-semibold grid-md:text-sm">{formatCurrency(item?.priceAtTime)}</p>
              <p className="text-sm text-gray-500">x{item?.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <hr className="flex h-[1px] w-full items-center justify-center bg-gray-400 px-4" />
      <div className="flex w-full items-center justify-between p-2">
        <div className="flex flex-col gap-2 grid-sm:flex-row">
          <Button
            variant="outlined"
            size="small"
            className="whitespace-nowrap"
            onClick={() => navigate(`/order/id/${product?.id}`)}
          >
            <BiInfoCircle className="mr-2 h-4 w-4" />
            Chi tiết
          </Button>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Tổng tiền:</p>
          <p className="text-lg font-semibold grid-md:text-xl">{formatCurrency(product?.totalAmount)}</p>
        </div>
      </div>
    </div>
  );
};

export default memo(OrderItem);
