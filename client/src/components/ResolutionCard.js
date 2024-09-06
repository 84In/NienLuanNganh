import React from "react";
import { Box } from "@mui/material";

const ResolutionCard = ({ icon, title }) => {
  return (
    <Box sx={{ border: "1px", padding: "1rem" }}>
      <div className="flex flex-col items-center justify-center">
        <div className="text-primary-color flex h-fit w-40 items-center justify-center">{icon}</div>
        <h3 className="text-center text-lg font-semibold">{title}</h3>
      </div>
    </Box>
  );
};

export default ResolutionCard;
