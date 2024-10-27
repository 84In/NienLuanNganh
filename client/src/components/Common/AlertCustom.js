import { Alert, AlertTitle } from "@mui/material";
import React from "react";

const AlertCustom = ({ title, content, variant }) => {
  return (
    <Alert
      severity={variant ? variant : "info"}
      className="fixed left-1/2 top-6 z-50 w-60 -translate-x-1/2 transform border shadow-md grid-sm:w-[300px] grid-md:w-[450px]"
    >
      <AlertTitle>{title}</AlertTitle>
      {content}
    </Alert>
  );
};

export default AlertCustom;
