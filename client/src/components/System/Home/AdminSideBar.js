import React, { memo } from "react";
import { AdminNavButton } from "../../";
import { adminSideBar } from "../../../utils/constant";

const AdminSideBar = () => {
  return (
    <div className="ml-2 mt-2 flex h-[88vh] flex-col gap-2 rounded-md bg-white p-4">
      {adminSideBar?.length > 0 &&
        adminSideBar.map((item, index) => {
          return (
            <div key={index}>
              <AdminNavButton Icon={item?.icon} path={item?.path} title={item?.name} />
            </div>
          );
        })}
    </div>
  );
};

export default memo(AdminSideBar);
