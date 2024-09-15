import React, { memo } from "react";
import { NavLink } from "react-router-dom";

const active = "flex gap-4 p-2 item-center rounded-md bg-gray-200";
const nonActive = "flex gap-4 p-2 item-center text-gray-400 rounded-md hover:bg-gray-200";

const AdminNavButton = ({ Icon, path, title, sizeIC }) => {
  return (
    <>
      {path === "" ? (
        <NavLink to={path} end className={({ isActive }) => (isActive ? active : nonActive)}>
          <span className="text-xl">
            <Icon size={sizeIC ? sizeIC : "24"} />
          </span>
          <span className="text-xl">{title}</span>
        </NavLink>
      ) : (
        <NavLink to={path} className={({ isActive }) => (isActive ? active : nonActive)}>
          <span className="text-xl">
            <Icon size={sizeIC ? sizeIC : "24"} />
          </span>
          <span className="text-xl">{title}</span>
        </NavLink>
      )}
    </>
  );
};

export default memo(AdminNavButton);
