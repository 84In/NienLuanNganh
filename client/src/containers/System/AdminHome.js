import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { memo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AdminSideBar } from "../../components";
import { AdminHeader } from "./";

const AdminHome = ({ user }) => {
  const navigate = useNavigate();
  if (user === null || user === undefined || !user?.roles.some((role) => role.name === "ADMIN")) {
    navigate("/");
  }

  return (
    <div className="w-full">
      <Grid2 container sx={{ width: "100%" }}>
        {/* Header full màn hình */}
        <Grid2 item xs={12}>
          <AdminHeader user={user} />
        </Grid2>
        <Grid2 container xs={12}>
          {/* Sidebar chiếm 2 cột */}
          <Grid2 item xs={2}>
            <AdminSideBar />
          </Grid2>
          {/* Nội dung chính chiếm 10 cột */}
          <Grid2 item xs={10}>
            <Outlet />
          </Grid2>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default memo(AdminHome);
