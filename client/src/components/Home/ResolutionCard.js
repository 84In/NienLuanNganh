import React from "react";
import { Box } from "@mui/material";

const ResolutionCard = ({ icon, title }) => {
  return (
    <Box sx={{ border: "1px", padding: "1rem" }}>
      <div className="flex flex-col items-center justify-center">
        <div className="flex h-fit w-40 items-center justify-center text-primary-color">{icon}</div>
        <h3 className="text-center text-base font-medium">{title}</h3>
      </div>
    </Box>
  );
};

export default ResolutionCard;
