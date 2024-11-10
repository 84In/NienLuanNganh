import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { path } from "../../utils";

const active = "m-2 p-2 font-semibold underline underline-offset-1";
const nonActive = "m-2 p-2 font-semibold";

const AdminBanner = () => {
  return (
    <div className="flex flex-col gap-2 bg-gray-200 p-2">
      <div className="rounded-md bg-white p-2 text-2xl font-semibold underline-offset-1">Quản lý banner</div>
      <div className="rounded-md bg-white">
        <div className="flex h-10 items-center rounded-tl-md rounded-tr-md bg-gray-100">
          <NavLink to={""} end className={({ isActive }) => (isActive ? active : nonActive)}>
            Bảng tổng hợp
          </NavLink>
          <NavLink to={path.ADMIN_BANNER_CREATE} className={({ isActive }) => (isActive ? active : nonActive)}>
            Tạo banner mới
          </NavLink>
        </div>
        <div className="m-2 items-center p-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminBanner;
