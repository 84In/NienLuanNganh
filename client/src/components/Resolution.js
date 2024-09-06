import React from "react";
import { Box } from "@mui/material";
import { FaShippingFast, FaTags } from "react-icons/fa";
import { HiBadgeCheck } from "react-icons/hi";
import { RiRefund2Line } from "react-icons/ri";
import { ResolutionCard } from ".";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const Resolution = () => {
  const itemResolution = [
    {
      icon: <HiBadgeCheck style={{ height: "80px", width: "80px" }} />,
      title: "Đảm bảo chính hãng",
    },
    {
      icon: <RiRefund2Line style={{ height: "80px", width: "80px" }} />,
      title: "Hoàn tiền nếu hàng giả",
    },
    {
      icon: <FaShippingFast style={{ height: "80px", width: "80px" }} />,
      title: "Giao hành nhanh chóng",
    },
    {
      icon: <FaTags style={{ height: "80px", width: "80px" }} />,
      title: "Vô địch trong tầm giá",
    },
  ];

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
      <h2 className="mb-4 px-2 text-lg font-semibold">Cam Kết</h2>
      <Grid2 container spacing={1} sx={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
        {itemResolution.map((item, index) => (
          <Grid2 xs={6} md={2.9} key={index}>
            <ResolutionCard icon={item.icon} title={item.title} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Resolution;
