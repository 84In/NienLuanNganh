import React from "react";
import { Box, Typography } from "@mui/material";
import { widgetIcon } from "../utils/constant";
import { Link } from "react-router-dom";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const Widget = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 2,
        bgcolor: "white",
        borderRadius: "10px",
        rowGap: "2rem",
        width: "100%",
        height: "fit-content",
      }}
    >
      <Grid2 container spacing={2}>
        {widgetIcon.map((item, index) => (
          <Grid2 item xs={6} sm={3} md={1.5} key={index}>
            <Link to={item.url}>
              <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                <img src={item.icon} alt={item.text} className="h-10 w-10 rounded-xl" />
                <Typography variant="caption" color="text.secondary">
                  {item.text}
                </Typography>
              </Box>
            </Link>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Widget;
