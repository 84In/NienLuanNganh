import { Navigate } from "react-router-dom";
import { path } from "../../utils/constant";

const PrivateRoute = ({ element, isLoggedIn, onAccessDenied }) => {
  // Call onAccessDenied if the user is not logged in
  if (!isLoggedIn) {
    onAccessDenied(); // Trigger the callback
  }

  return element;
};

export default PrivateRoute;
