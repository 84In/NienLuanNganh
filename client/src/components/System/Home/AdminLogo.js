import React from "react";

import logo from "../../../assets/images/logo2.png";

const AdminLogo = () => {
  return (
    <div className="my-2 flex items-center justify-center gap-1 border border-white">
      <img className="h-32 w-40 object-contain" src={logo} alt="Logo" />
    </div>
  );
};

export default AdminLogo;
