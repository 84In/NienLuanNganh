import { Box, Button } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <Grid2
      container
      rowGap={2}
      columnGap={"none"}
      sx={{ display: "flex", justifyContent: "space-between", width: "100%", paddingX: "1rem", height: "100%" }}
    >
      <Box
        container
        rowGap={2}
        columnGap={"none"}
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
          bgcolor: "white",
          borderRadius: "8px",
          rowGap: "1rem",
          width: "100%",
          height: "80vh",
        }}
      >
        {/* <img
          className="m-0 flex w-[1480px] items-center justify-center object-contain p-0"
          src={page404Image}
          alt="page404"
        /> */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="text-center font-mono text-[180px] text-primary-color">404</div>
          <div className="h-12 text-center text-2xl">Page Not Found</div>
          <Button variant="contained" onClick={() => navigate("/")}>
            Trở lại trang chủ
          </Button>
        </div>
      </Box>
    </Grid2>
  );
};

export default memo(Page404);
