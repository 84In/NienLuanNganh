import { Button } from "@mui/material";
import React, { memo } from "react";

const ContactButton = ({ icon, title, info, nameButton, onClick }) => {
  return (
    <div className="flex justify-between gap-4">
      <div className="flex gap-2">
        <div className="flex justify-center">{React.createElement(icon, { className: "h-6 w-6 text-gray-500" })}</div>
        <div className="w-40 break-words text-sm grid-md:w-[80%] grid-md:text-base">
          <p className="text-gray-500">
            {title}
            {info && <span className="text-black">: {info}</span>}
          </p>
        </div>
      </div>
      <div className="flex w-[100px] min-w-[100px] items-center justify-center">
        <Button onClick={onClick} variant="outlined" color="primary" size="small" className="mb-2 w-full">
          {nameButton}
        </Button>
      </div>
    </div>
  );
};

export default memo(ContactButton);
