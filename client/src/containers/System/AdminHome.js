import React, { memo } from "react";
import { AdminHeader } from "./";

const AdminHome = ({ user }) => {
  return (
    <div className="w-full">
      <AdminHeader user={user} />
    </div>
  );
};

export default memo(AdminHome);
