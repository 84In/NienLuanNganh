import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { EditContact, MainContainer } from "./components";
import { AccountInfo, Cart, Filter, Home, OrderHistory, Page404, ProductDetail } from "./containers/Public";
import {
  AdminBase,
  AdminHome,
  AdminProduct,
  AdminProductContent,
  AdminProductCreate,
  AdminProductCSV,
  AdminProductEditByID,
  AdminUser,
  AdminUserContent,
  AdminUserCreate,
  AdminUserEditByID,
} from "./containers/System";
import { PrivateAdminFilterRouter, PrivateRoute } from "./router";
import * as action from "./store/actions";
import { path } from "./utils/constant";
import { useScrollToTop } from "./hooks";

function App() {
  useScrollToTop();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, username } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.user);
  const [isModelLogin, setIsModelLogin] = useState(false);

  useEffect(() => {
    dispatch(action.getCategories());
    if (isLoggedIn && username) {
      setTimeout(() => {
        dispatch(action.getUserInfo(username)); // Dispatch action sau thời gian delay
      }, 100);
    }
  }, [isLoggedIn, username, dispatch]);

  const handleAccessDenied = () => {
    setIsModelLogin(true);
    navigate(path.HOME);
  };

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
            element={
              <PrivateRoute element={<AccountInfo />} isLoggedIn={isLoggedIn} onAccessDenied={handleAccessDenied} />
            }
          />
          <Route
            path={path.ACCOUNT + "/" + path.EDIT_PHONE}
            element={
              <PrivateRoute element={<EditContact />} isLoggedIn={isLoggedIn} onAccessDenied={handleAccessDenied} />
            }
          />
          <Route
            path={path.ACCOUNT + "/" + path.EDIT_EMAIL}
            element={
              <PrivateRoute element={<EditContact />} isLoggedIn={isLoggedIn} onAccessDenied={handleAccessDenied} />
            }
          />
          <Route
            path={path.ACCOUNT + "/" + path.EDIT_ADDRESS}
            element={
              <PrivateRoute element={<EditContact />} isLoggedIn={isLoggedIn} onAccessDenied={handleAccessDenied} />
            }
          />
          <Route
            path={path.ACCOUNT + "/" + path.EDIT_PASSWORD}
            element={
              <PrivateRoute element={<EditContact />} isLoggedIn={isLoggedIn} onAccessDenied={handleAccessDenied} />
            }
          />
          <Route
            path={path.CART}
            element={<PrivateRoute element={<Cart />} isLoggedIn={isLoggedIn} onAccessDenied={handleAccessDenied} />}
          />
          <Route
            path={path.ORDER_HISTORY}
            element={
              <PrivateRoute element={<OrderHistory />} isLoggedIn={isLoggedIn} onAccessDenied={handleAccessDenied} />
            }
          />
          <Route path={path.PRODUCT_DETAIL} element={<ProductDetail />} />
          <Route path={path.PRODUCT_SEARCH} element={<Filter />} />
          <Route path="*" element={<Page404 />} />
        </Route>
        <Route
          path={path.ADMIN_HOME}
          element={<PrivateAdminFilterRouter element={AdminHome} roles={["ADMIN"]} user={userData} />}
        >
          <Route index element={<AdminBase user={userData} />} />
          <Route
            path={path.ADMIN_USER}
            element={<PrivateAdminFilterRouter element={AdminUser} roles={["ADMIN"]} user={userData} />}
          >
            <Route index element={<AdminUserContent />} />
            <Route path={path.ADMIN_USER_CREATE} element={<AdminUserCreate />} />
            <Route path={path.ADMIN_USER_EDIT} element={<AdminUserEditByID />} />
          </Route>
          <Route
            path={path.ADMIN_PRODUCT}
            element={<PrivateAdminFilterRouter element={AdminProduct} roles={["ADMIN"]} user={userData} />}
          >
            <Route index element={<AdminProductContent />} />
            <Route path={path.ADMIN_PRODUCT_CREATE} element={<AdminProductCreate />} />
            <Route path={path.ADMIN_PRODUCT_EDIT} element={<AdminProductEditByID />} />
            <Route path={path.ADMIN_PRODUCT_IMPORT_CSV} element={<AdminProductCSV />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
