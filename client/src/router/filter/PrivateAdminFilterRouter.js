import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { path } from "../../utils/constant";
const PrivateAdminFilterRouter = ({ element: Element, roles, ...rest }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.user);

  if (!isLoggedIn) {
    return <Navigate to={"/" + path.ACCOUNT} />;
  }

  if (roles && userData?.roles && !userData.roles.some((role) => roles.includes(role.name))) {
    return <Navigate to="/403" />;
  }

  return <Element {...rest} />;
};

export default PrivateAdminFilterRouter;
