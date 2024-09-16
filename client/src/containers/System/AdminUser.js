import React, { memo } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { path } from "../../utils/constant";

const AdminUser = ({ user }) => {
  const active = "m-2 p-2 font-semibold underline";
  const nonActive = "m-2 p-2 font-semibold";

  return (
    <div className="flex w-full flex-col gap-2 bg-gray-200 p-2">
      <div className="rounded-md bg-white p-2 text-2xl font-semibold">Manager User</div>
      <div className="rounded-md bg-white">
        <div className="rouded-tr-md flex h-10 items-center rounded-tl-md bg-gray-100">
          <NavLink to={""} end className={({ isActive }) => (isActive ? active : nonActive)}>
            User Table
          </NavLink>
          <NavLink to={path.ADMIN_USER_CREATE} className={({ isActive }) => (isActive ? active : nonActive)}>
            Create User
          </NavLink>
        </div>
        <div className="m-1 flex items-center p-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default memo(AdminUser);
