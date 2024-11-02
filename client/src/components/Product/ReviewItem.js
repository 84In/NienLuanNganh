import { Box, Rating } from "@mui/material";
import React, { memo } from "react";

const defaultAvatar = require("../../assets/images/profile.png");

const ReviewItem = ({ review }) => {
  return (
    <Box className="flex flex-col gap-2 rounded-md border p-2 shadow-md">
      <div className="flex h-14 w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            className="avatar h-10 w-10 rounded-full border border-black bg-white object-cover"
            src={review?.user?.avatar ? process.env.REACT_APP_SERVER_URL + review?.user?.avatar : defaultAvatar}
            alt="Avatar"
          />
          <p>{review?.user?.firstName + " " + review?.user?.lastName}</p>
        </div>
        <Rating value={review?.rating} precision={1} size="medium" readOnly />
      </div>
      <div className="whitespace-pre-line break-words rounded-lg border bg-white p-2">{review?.comment}</div>
      <div className="w-full text-right text-xs text-gray-500">{`Ngày: ${new Date(review?.createdAt).toLocaleDateString()}`}</div>
    </Box>
  );
};

export default memo(ReviewItem);
