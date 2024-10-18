import { Box, Rating } from "@mui/material";
import React, { memo } from "react";

const defaultAvatar = require("../../assets/images/profile.png");

const ReviewItem = ({ review }) => {
  return (
    <Box className="flex flex-col gap-2 rounded-md border p-2 shadow-md">
      <div className="flex h-14 w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            className="avatar h-10 w-10 rounded-full border border-black bg-white object-cover"
            src={defaultAvatar}
            alt="Avatar"
          />
          <p>{review?.name}</p>
        </div>
        <Rating value={review?.star} precision={1} size="medium" readOnly />
      </div>
      <div className="break-words rounded-lg border bg-white p-2">{review?.comment}</div>
    </Box>
  );
};

export default memo(ReviewItem);
