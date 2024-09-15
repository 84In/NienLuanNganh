import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { EditContact, MainContainer } from "./components";
import { AccountInfo, Cart, Home, OrderHistory, Page404, ProductDetail } from "./containers/Public";
import { AdminBase, AdminHome } from "./containers/System";
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
          <Route path={path.ORDER_HISTORY} element={<OrderHistory />} />
          <Route path="*" element={<Page404 />} />
        </Route>
        <Route path={path.MANAGER_HOME} element={<AdminHome user={userData} />}>
          <Route index element={<AdminBase user={userData} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
