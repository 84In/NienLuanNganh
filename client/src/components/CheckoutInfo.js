import { Box } from "@mui/material";
import React from "react";
import { path } from "../utils";
import { Link } from "react-router-dom";

const CheckoutInfo = ({ userData }) => {
  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "white",
        borderRadius: "8px",
        gap: "2rem",
        width: "100%",
        height: "fit-content",
      }}
    >
      <div className="mb-4 flex justify-between">
        <p className="font-semibold">Người nhận</p>
        <Link to={path.HOME + path.ACCOUNT}>
          <p className="text-blue-500">Thay đổi</p>
        </Link>
      </div>
      <hr className="mx-1 mb-4 border-gray-400" />
      {userData && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 font-semibold">
            <p>{userData?.firstName + " " + userData?.lastName}</p>
            <span className="p-2 text-gray-200">|</span>
            <p>{userData?.phone}</p>
          </div>
          <div>
            <span className="font-semibold">Địa chỉ: </span>
            {userData?.address.fullName}
          </div>
        </div>
      )}
    </Box>
  );
};

export default CheckoutInfo;
