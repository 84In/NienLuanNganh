import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { EditContact, MainContainer } from "./components";
import { AccountInfo, Home, ProductDetail } from "./containers/Public";
import * as action from "./store/actions";
import { path } from "./utils/constant";

function App() {
  const dispath = useDispatch();
  const { isLoggedIn, username } = useSelector((state) => state.auth);
  const [isModelLogin, setIsModelLogin] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      dispath(action.getUserInfo(username));
    }
  }, [dispath, isLoggedIn, username]);

  return (
    <div className="flex h-full w-full flex-col items-center gap-4 bg-gray-200">
      <Routes>
        <Route path={path.HOME} element={<Home isModelLogin={isModelLogin} setIsModelLogin={setIsModelLogin} />}>
          <Route path="*" element={<MainContainer />} />
          <Route
            path={path.ACCOUNT}
            element={<AccountInfo isModelLogin={isModelLogin} setIsModelLogin={setIsModelLogin} />}
          />
          <Route
            path={"account/" + path.EDIT_PHONE}
            element={<EditContact isModelLogin={isModelLogin} setIsModelLogin={setIsModelLogin} />}
          />
          <Route
            path={"account/" + path.EDIT_EMAIL}
            element={<EditContact isModelLogin={isModelLogin} setIsModelLogin={setIsModelLogin} />}
          />
          <Route
            path={"account/" + path.EDIT_ADDRESS}
            element={<EditContact isModelLogin={isModelLogin} setIsModelLogin={setIsModelLogin} />}
          />
          <Route
            path={"account/" + path.EDIT_PASSWORD}
            element={<EditContact isModelLogin={isModelLogin} setIsModelLogin={setIsModelLogin} />}
          />
          <Route path={path.PRODUCT_DETAIL} element={<ProductDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
