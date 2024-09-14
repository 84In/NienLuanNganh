import React, { memo } from "react";

import logo from "../../../assets/images/logo_management.png";

const AdminLogo = () => {
  return (
    <div className="my-2 flex w-full items-center justify-center gap-1">
      <img className="h-32 w-40 object-contain" src={logo} alt="Logo" />
      {/* <ButtonCustom HoverColor={"none"} TextColor={"text-white"} IconBefore={RiLogoutBoxLine} /> */}
    </div>
  );
};

export default memo(AdminLogo);
