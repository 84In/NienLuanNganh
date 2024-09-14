import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { useSelector } from "react-redux";
import { CartSideBar } from "../../components";

const Cart = () => {
  const { userData } = useSelector((state) => state.user);

  return (
    <Grid2
      container
      rowGap={2}
      columnGap={"none"}
      sx={{ display: "flex", justifyContent: "space-between", width: "100%", paddingX: "1rem", height: "100%" }}
    >
      <Grid2 item container xs={12} md={9.3} sx={{ display: "flex", gap: 2 }}>
        <Grid2
          item
          xs={12}
          sx={{
            flexGrow: 1,
            p: 2,
            bgcolor: "white",
            borderRadius: "8px",
            gap: "2rem",
            width: "100%",
            height: "fit-content",
          }}
        >
          <div>
            <input type="checkbox" name="" className="h-4 w-4 text-blue-500 transition duration-150 ease-in-out" />
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </Grid2>
        <Grid2
          item
          xs={12}
          sx={{
            flexGrow: 1,
            p: 2,
            bgcolor: "white",
            borderRadius: "8px",
            gap: "2rem",
            width: "100%",
            height: "fit-content",
          }}
        ></Grid2>
      </Grid2>
      <Grid2 item container xs={12} md={2.5} sx={{ width: "100%" }}>
        <CartSideBar />
      </Grid2>
    </Grid2>
  );
};

export default Cart;
