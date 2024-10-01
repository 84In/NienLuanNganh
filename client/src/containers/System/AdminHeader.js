import React, { memo } from "react";
import logo from "../../assets/images/logo_management.png";
import { Link } from "react-router-dom";
import { AdminNav, SearchBar } from "../../components";
import { path } from "../../utils/constant";
import icons from "../../utils/icons";

const { GoSearch } = icons;

const AdminHeader = ({ user }) => {
  return (
    <div className="flex h-fit min-h-[90px] w-full items-center gap-4 bg-third-color px-6 py-2">
      <div className="flex h-full w-2/12 items-center justify-center">
        <Link to={path.ADMIN_HOME}>
          <img className="h-[40px] w-[150px] max-w-none object-cover" src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="flex w-8/12 flex-auto items-center justify-start">
        <div className="w-full">
          <SearchBar isAdmin={true} IconBefore={GoSearch} />
          {/* <div className="flex items-center justify-start">Nav Bar</div> */}
        </div>
      </div>
      <div className="flex w-2/12">
        <AdminNav user={user} />
      </div>
    </div>
  );
};

export default memo(AdminHeader);
