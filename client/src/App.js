import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Footer, Header, Home, Login } from "./containers/Public";
import { path } from "./utils/constant";

function App() {
  const [isModelLogin, setIsModelLogin] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <div className="flex h-full w-full flex-col items-center gap-4 bg-gray-200">
      <Header isModelLogin={isModelLogin} setIsModelLogin={setIsModelLogin} isLoggedIn={isLoggedIn} />
      {isModelLogin && <Login setIsModelLogin={setIsModelLogin} />}
      <Routes>
        <Route path={path.HOME} element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
