import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { widgetIcon } from "../utils/constant";

const Widget = () => {
  return (
    <Box sx={{ flexGrow: 1, bgcolor: "white", borderRadius: 2, p: 2, width: "100%" }}>
      <Grid container spacing={2}>
        {widgetIcon.map((item, index) => (
          <Grid item xs={6} sm={3} md={1.5} key={index}>
            <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
              <img src={item.icon} alt={item.text} className="h-10 w-10 rounded-xl" />
              <Typography variant="caption" color="text.secondary">
                {item.text}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Widget;
