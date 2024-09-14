import React, { memo } from "react";
import { AdminLogo, AdminNav, SearchBar } from "../../components";
import icons from "../../utils/icons";

const { GoSearch } = icons;

const AdminHeader = ({ user }) => {
  return (
    <div className="flex h-16 w-full items-center gap-3 bg-third-color">
      <div className="flex w-[288px]">
        <AdminLogo />
      </div>
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
