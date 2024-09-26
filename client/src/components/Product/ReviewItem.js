import { Box, Rating } from "@mui/material";
import React, { memo } from "react";

const defaultAvatar = require("../../assets/images/profile.png");

const ReviewItem = ({ rating }) => {
  return (
    <Box className="flex flex-col gap-2 rounded-lg bg-gray-100 p-2">
      <div className="flex h-14 w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            className="avatar h-10 w-10 rounded-full border border-black bg-white object-cover"
            src={defaultAvatar}
            alt="Avatar"
          />
          <p>{rating.name}</p>
        </div>
        <Rating value={rating.star} precision={1} size="medium" readOnly />
      </div>
      <div className="rounded-lg border bg-white p-2 text-justify">{rating.comment}</div>
    </Box>
  );
};

export default memo(ReviewItem);
