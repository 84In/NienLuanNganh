import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { memo, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AdminSideBar } from "../../components";
import { AdminHeader } from "./";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions";

const AdminHome = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (user === null || user === undefined || !user?.roles.some((role) => role.name === "ADMIN")) {
    navigate("/");
  }

  useEffect(() => {
    dispatch(actions.getRoles());
    dispatch(actions.getProvinces());
  });

  return (
    <div className="h-full min-h-screen w-full">
      <Grid2 container sx={{ width: "100%" }}>
        {/* Header full màn hình */}
        <Grid2 item xs={12}>
          <AdminHeader user={user} />
        </Grid2>
        <Grid2 container xs={12}>
          {/* Sidebar chiếm 2 cột */}
          <Grid2 item xs={3}>
            <AdminSideBar />
          </Grid2>
          {/* Nội dung chính chiếm 10 cột */}
          <Grid2 item xs={9}>
            <Outlet />
          </Grid2>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default memo(AdminHome);
