import React from "react";
import { formatCurrency, formattedNumber } from "../../../utils";

const AdminTag = ({ Icon, data, type, typeData, date }) => {
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
            <span className="font-semibold">
              {typeData === "all" ? `Tổng số lượng sản phẩm ` : "Số lượng sản phẩm mới"}
            </span>
            <div>{formattedNumber(data)}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminTag;
