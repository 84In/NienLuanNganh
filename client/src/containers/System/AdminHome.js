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
    <div className="w-full border border-blue-700">
      <AdminHeader user={user} />
      <div className="flex">
        <AdminSideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default memo(AdminHome);
