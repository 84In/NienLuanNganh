import React, { memo } from "react";
import { AdminLogo, AdminNav, SearchBar } from "../../components";
import icons from "../../utils/icons";

const { GoSearch } = icons;

const AdminHeader = ({ user }) => {
  return (
    <div className="flex h-fit min-h-[90px] w-full items-center gap-4 bg-third-color px-6 py-2">
      <AdminLogo />
      <div className="flex flex-auto items-center justify-start">
        <div className="pl-2">
          <SearchBar isAdmin={true} IconBefore={GoSearch} />
          {/* <div className="flex items-center justify-start">Nav Bar</div> */}
        </div>
      </div>
      <div className="flex">
        <AdminNav user={user} />
      </div>
    </div>
  );
};

export default memo(AdminHeader);
