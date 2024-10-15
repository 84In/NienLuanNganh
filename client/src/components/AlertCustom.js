import { Alert, AlertTitle } from "@mui/material";
import React from "react";

const AlertCustom = ({ title, content, variant }) => {
  return (
    <Alert
      severity={variant ? variant : "warning"}
      className="fixed left-1/2 top-6 z-50 w-[450px] -translate-x-1/2 transform border shadow-md"
    >
      <AlertTitle>{title}</AlertTitle>
      {content}
    </Alert>
  );
};

export default AlertCustom;
