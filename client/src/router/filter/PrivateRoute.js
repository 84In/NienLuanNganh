const PrivateRoute = ({ element, isLoggedIn, onAccessDenied }) => {
  if (!isLoggedIn) {
    onAccessDenied();
  }

  return element;
};

export default PrivateRoute;
