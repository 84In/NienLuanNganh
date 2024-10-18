import { Button } from "@mui/material";
import React from "react";

const ConfirmAlert = ({ title, content, titleConfirm, titleCancel, onConfirm, onCancel }) => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full content-center items-center justify-center shadow-md"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="h-fit w-[350px] flex-col rounded-md border bg-white p-2">
        <div className="mb-2 p-2">
          <h1 className="mb-2 text-left text-xl font-semibold">{title}</h1>
          <div className="text-left">{content}</div>
        </div>
        <div className="flex justify-end gap-2 p-2">
          <Button variant="outlined" onClick={onConfirm}>
            {titleConfirm}
          </Button>
          <Button variant="contained" onClick={onCancel}>
            {titleCancel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAlert;
