import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { EditContact, MainContainer } from "./components";
import { AccountInfo, Cart, Home, Page404, ProductDetail } from "./containers/Public";
import { AdminBase, AdminHome, AdminProduct, AdminUser } from "./containers/System";
import PrivateAdminFilterRouter from "./router/filter/PrivateAdminFilterRouter";
import * as action from "./store/actions";
import { path } from "./utils/constant";
function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, username } = useSelector((state) => state.auth);
  const [isModelLogin, setIsModelLogin] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(action.getUserInfo(username));
    }
  }, [dispatch, isLoggedIn, username]);

  const { userData } = useSelector((state) => state.user);

  return (
    <div className="flex h-full w-full flex-col items-center gap-4 bg-gray-200">
      <Routes>
        <Route
          path={path.HOME}
          element={<Home User={userData} isModelLogin={isModelLogin} setIsModelLogin={setIsModelLogin} />}
        >
          <Route index element={<MainContainer />} />
          <Route
            path={path.ACCOUNT}
            element={<AccountInfo isModelLogin={isModelLogin} setIsModelLogin={setIsModelLogin} />}
          />
          <Route
            path={path.ACCOUNT + path.EDIT_PHONE}
            element={<EditContact isModelLogin={isModelLogin} setIsModelLogin={setIsModelLogin} />}
          />
          <Route
            path={path.ACCOUNT + path.EDIT_EMAIL}
            element={<EditContact isModelLogin={isModelLogin} setIsModelLogin={setIsModelLogin} />}
          />
          <Route
            path={path.ACCOUNT + path.EDIT_ADDRESS}
            element={<EditContact isModelLogin={isModelLogin} setIsModelLogin={setIsModelLogin} />}
          />
          <Route
            path={path.ACCOUNT + path.EDIT_PASSWORD}
            element={<EditContact isModelLogin={isModelLogin} setIsModelLogin={setIsModelLogin} />}
          />
          <Route path={path.PRODUCT_DETAIL} element={<ProductDetail />} />

          <Route path={path.CART} element={<Cart />} />
          <Route path="*" element={<Page404 />} />
        </Route>
        <Route
          path={path.MANAGER_HOME}
          element={<PrivateAdminFilterRouter element={AdminHome} roles={["ADMIN"]} user={userData} />}
        >
          <Route index element={<AdminBase user={userData} />} />
          <Route
            path={path.ADMIN_USER}
            element={<PrivateAdminFilterRouter element={AdminUser} roles={["ADMIN"]} user={userData} />}
          />
          <Route
            path={path.ADMIN_PRODUCT}
            element={<PrivateAdminFilterRouter element={AdminProduct} roles={["ADMIN"]} user={userData} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
