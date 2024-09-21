import React, { memo } from "react";

import logo from "../../../assets/images/logo_management.png";

const AdminLogo = () => {
  return (
    <div className="flex h-full w-48 items-center justify-center">
      <img className="h-[40px] w-[150px] max-w-none object-cover" src={logo} alt="Logo" />
      {/* <ButtonCustom HoverColor={"none"} TextColor={"text-white"} IconBefore={RiLogoutBoxLine} /> */}
    </div>
  );
};

export default memo(AdminLogo);
