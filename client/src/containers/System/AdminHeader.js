import React, { memo } from "react";
import logo from "../../assets/images/logo_management.png";
import { Link } from "react-router-dom";
import { AdminNav } from "../../components";
import { path } from "../../utils/constant";
import { FiMenu } from "react-icons/fi";

const AdminHeader = ({ user, toggleSidebar }) => {
  return (
    <div className="flex h-fit min-h-[90px] w-full items-center justify-between gap-4 bg-third-color px-6 py-2">
      <div className="flex h-full w-2/12 items-center justify-center">
        <Link to={path.ADMIN_HOME}>
          <img className="h-[40px] w-[150px] max-w-none object-cover" src={logo} alt="Logo" />
        </Link>
        <div>
          {/* Nút để mở/đóng sidebar trên màn hình nhỏ */}
          <button className="p-2 text-xl sm:block" onClick={toggleSidebar}>
            <FiMenu size={24} />
          </button>
        </div>
      </div>
      <div className="flex w-2/12">
        <AdminNav user={user} />
      </div>
    </div>
  );
};

export default memo(AdminHeader);
