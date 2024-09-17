import React, { memo } from "react";
import { FaCheckCircle, FaInfoCircle, FaShoppingCart, FaTimesCircle } from "react-icons/fa";
import { formatCurrency } from "../utils/format";
import { Button } from "@mui/material";

const OrderItem = ({ product }) => {
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-white p-2 shadow-md grid-md:p-4">
      <div className={`flex items-center gap-2 ${product.status === "delivered" ? "text-green-600" : "text-red-600"}`}>
        {product.status === "delivered" ? (
          <>
            <FaCheckCircle className="h-5 w-5" />
            <span className="font-medium">Giao hàng thành công</span>
          </>
        ) : (
          <>
            <FaTimesCircle className="h-5 w-5" />
            <span className="font-medium">Đã hủy</span>
          </>
        )}
      </div>
      <div className="flex items-start gap-4">
        <img src={product.image} alt={product.name} className="h-20 w-20 rounded object-cover" />
        <div className="flex-grow">
          <h3 className="line-clamp-3 font-medium">{product.name}</h3>
        </div>
        <div className="text-right">
          <p className="font-medium">{formatCurrency(product.price)}</p>
          <p className="text-sm text-gray-500">x{product.quantity}</p>
        </div>
      </div>
      <hr className="flex h-[1px] w-full items-center justify-center bg-gray-400 px-4" />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Tổng tiền:</p>
          <p className="text-xl font-semibold">{formatCurrency(product.price * product.quantity)}</p>
        </div>
        <div className="flex flex-col gap-2 grid-sm:flex-row">
          <Button variant="outlined" size="small" className="whitespace-nowrap">
            <FaShoppingCart className="mr-2 h-4 w-4" />
            Mua lại
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(OrderItem);
