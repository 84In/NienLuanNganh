import React, { memo } from "react";

import logo from "../../../assets/images/logo_management.png";
import { Link } from "react-router-dom";
import { path } from "../../../utils/constant";

const AdminLogo = () => {
  return (
    <div className="flex h-full w-48 items-center justify-center">
      <Link to={path.HOME}>
        <img className="h-[40px] w-[150px] max-w-none object-cover" src={logo} alt="Logo" />
      </Link>
      {/* <ButtonCustom HoverColor={"none"} TextColor={"text-white"} IconBefore={RiLogoutBoxLine} /> */}
    </div>
  );
};

export default memo(AdminLogo);
