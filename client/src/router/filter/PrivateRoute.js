import { Navigate } from "react-router-dom";
import { path } from "../../utils/constant";

const PrivateRoute = ({ element, isLoggedIn, onAccessDenied }) => {
  if (!isLoggedIn) {
    onAccessDenied();
  }

  return element;
};

export default PrivateRoute;
