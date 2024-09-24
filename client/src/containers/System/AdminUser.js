import React, { memo } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { path } from "../../utils/constant";

const AdminUser = ({ user }) => {
  const active = "m-2 p-2 font-semibold underline underline-offset-1";
  const nonActive = "m-2 p-2 font-semibold";

  return (
    <div className="flex flex-col gap-2 bg-gray-200 p-2">
      <div className="rounded-md bg-white p-2 text-2xl font-semibold underline-offset-1">Manager User</div>
      <div className="rounded-md bg-white">
        <div className="flex h-10 items-center rounded-tl-md rounded-tr-md bg-gray-100">
          <NavLink to={""} end className={({ isActive }) => (isActive ? active : nonActive)}>
            User Table
          </NavLink>
          <NavLink to={path.ADMIN_USER_CREATE} className={({ isActive }) => (isActive ? active : nonActive)}>
            Create User
          </NavLink>
        </div>
        <div className="m-2 items-center p-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default memo(AdminUser);
