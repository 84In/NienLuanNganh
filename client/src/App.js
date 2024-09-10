import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { AccountInfo, Footer, Header, Home, Login, ProductDetail } from "./containers/Public";
import { path } from "./utils/constant";
import * as action from "./store/actions";

function App() {
  const [isModelLogin, setIsModelLogin] = useState(false);
  const dispath = useDispatch();
  const { isLoggedIn, username } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      dispath(action.getUserInfo(username));
    }
  }, [isLoggedIn, username]);

  return (
    <div className="flex h-full w-full flex-col items-center gap-4 bg-gray-200">
      <Header isModelLogin={isModelLogin} setIsModelLogin={setIsModelLogin} isLoggedIn={isLoggedIn} />
      {isModelLogin && <Login setIsModelLogin={setIsModelLogin} />}
      <Routes>
        <Route path={path.HOME} element={<Home />} />
        <Route path={path.ACCOUNT} element={<AccountInfo />} />
        <Route path={path.PRODUCT_DETAIL} element={<ProductDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
