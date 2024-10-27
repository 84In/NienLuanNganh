import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { MainContainer } from "./components";
import {
  AccountInfo,
  Cart,
  Checkout,
  EditContact,
  Filter,
  Home,
  OrderDetail,
  OrderHistory,
  Page404,
  PaymentResult,
  ProductDetail,
  Search,
} from "./containers/Public";
import {
  AdminBase,
  AdminCategory,
  AdminCategoryContent,
  AdminCategoryCreate,
  AdminCategoryEditByID,
  AdminHome,
  AdminOrder,
  AdminOrderContent,
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
import * as actions from "./store/actions";
import { path } from "./utils/constant";
import { useScrollToTop } from "./hooks";

function App() {
  useScrollToTop();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, username } = useSelector((state) => state.auth);
  const { userData, cart } = useSelector((state) => state.user);
  const [isModelLogin, setIsModelLogin] = useState(false);

  useEffect(() => {
    dispatch(actions.getCategories());
    if (isLoggedIn && username) {
      setTimeout(() => {
        dispatch(actions.getCurrentUser());
        dispatch(actions.getCartCurrentUser());
        // dispatch(actions.getOrderCurrentUser());
      }, 200);
    }
  }, [isLoggedIn, username, dispatch]);

  useEffect(() => {
    if (userData?.roles) {
      navigate(userData?.roles.some((item) => item?.name === "ADMIN") && path.ADMIN_HOME);
    }
  }, [userData?.roles]);

  const handleAccessDenied = () => {
    setIsModelLogin(true);
    navigate(path.HOME);
  };

  return (
    <div className="flex h-full w-full flex-col items-center gap-4 bg-gray-200">
      <Routes>
        <Route
          path={path.HOME}
          element={<Home User={userData} cart={cart} isModelLogin={isModelLogin} setIsModelLogin={setIsModelLogin} />}
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
            element={
              <PrivateRoute
                element={<Cart />}
                setIsModelLogin={setIsModelLogin}
                isLoggedIn={isLoggedIn}
                onAccessDenied={handleAccessDenied}
              />
            }
          />
          <Route
            path={path.ORDER_HISTORY}
            element={
              <PrivateRoute element={<OrderHistory />} isLoggedIn={isLoggedIn} onAccessDenied={handleAccessDenied} />
            }
          />
          <Route
            path={path.ORDER_DETAIL}
            element={
              <PrivateRoute element={<OrderDetail />} isLoggedIn={isLoggedIn} onAccessDenied={handleAccessDenied} />
            }
          />
          <Route
            path={path.CHECKOUT}
            element={
              <PrivateRoute element={<Checkout />} isLoggedIn={isLoggedIn} onAccessDenied={handleAccessDenied} />
            }
          />
          <Route
            path={path.PAYMENT_RESULT}
            element={
              <PrivateRoute element={<PaymentResult />} isLoggedIn={isLoggedIn} onAccessDenied={handleAccessDenied} />
            }
          />
          <Route path={path.PRODUCT_DETAIL} element={<ProductDetail setIsModelLogin={setIsModelLogin} />} />
          <Route path={path.SEARCH} element={<Search />} />
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
            path={path.ADMIN_CATEGORY}
            element={<PrivateAdminFilterRouter element={AdminCategory} roles={["ADMIN"]} user={userData} />}
          >
            <Route index element={<AdminCategoryContent />} />
            <Route path={path.ADMIN_CATEGORY_CREATE} element={<AdminCategoryCreate />} />
            <Route path={path.ADMIN_CATEGORY_EDIT} element={<AdminCategoryEditByID />} />
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
          <Route
            path={path.ADMIN_ORDER}
            element={<PrivateAdminFilterRouter element={AdminOrder} roles={["ADMIN"]} user={userData} />}
          >
            <Route index element={<AdminOrderContent />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
