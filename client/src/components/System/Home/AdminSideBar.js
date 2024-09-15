import React from "react";
import { AdminNavButton } from "../../";
import { adminSideBar } from "../../../utils/constant";

const AdminSideBar = () => {
  return (
    <div className="flex h-svh w-[288px] flex-col gap-2 border border-red-600 bg-white object-contain p-4">
      {adminSideBar?.length > 0 &&
        adminSideBar.map((item, index) => {
          return (
            <div className="gap-4" key={index}>
              <AdminNavButton Icon={item?.icon} path={item?.path} title={item?.name} />
            </div>
          );
        })}
    </div>
  );
};

export default AdminSideBar;
