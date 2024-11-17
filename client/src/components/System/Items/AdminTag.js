import React from "react";
import { formatCurrency, formattedNumber } from "../../../utils";

const AdminTag = ({ Icon, data, type, date }) => {
  return (
    <div className="item-center flex gap-2 p-4">
      <div className="flex flex-1 items-center justify-center">
        <Icon size={56} />
      </div>
      <div className="flex flex-col justify-center">
        {type === "money" && (
          <>
            <span className="font-semibold">Doanh thu</span>
            <span className="font-semibold">ngày {date}</span>
            <div>{formatCurrency(data)}</div>
          </>
        )}
        {type === "product" && (
          <>
            <span className="font-semibold">{"Số lượng sản phẩm mới"}</span>
            <div>{formattedNumber(data)}</div>
          </>
        )}
        {type === "user" && (
          <>
            <span className="font-semibold">Người dùng mới trong 7 ngày quá</span>
            <div>{formattedNumber(data)}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminTag;
