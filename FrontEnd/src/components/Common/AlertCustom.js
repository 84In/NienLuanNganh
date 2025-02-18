import { Alert, AlertTitle, Snackbar } from "@mui/material";
import React, { useState } from "react";

const AlertCustom = ({ open, title, content, variant, onClose }) => {
  const [openSnackbar, setOpenSnackbar] = useState(open);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    onClose();
  };

  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={3000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Alert severity={variant ? variant : "info"} onClose={handleCloseSnackbar}>
        <AlertTitle>{title}</AlertTitle>
        {content}
      </Alert>
    </Snackbar>
  );
};

export default AlertCustom;
