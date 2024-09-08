import { Route, Routes } from "react-router-dom";
import { Footer, Header, Home, Login } from "./containers/Public";
import { path } from "./utils/constant";
import React, { useState } from "react";
import ProductDetail from "./components/Product/ProductDetail";

function App() {
  const [isModelLogin, setIsModelLogin] = useState(false);
  return (
    <div className="flex h-full w-full flex-col items-center gap-4 bg-gray-200">
      <Header isModelLogin={isModelLogin} setIsModelLogin={setIsModelLogin} />
      {isModelLogin && <Login setIsModelLogin={setIsModelLogin} />}
      <Routes>
        <Route path={path.HOME} element={<Home />} />
        <Route path={path.PRODUCT_DETAIL} element={<ProductDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
