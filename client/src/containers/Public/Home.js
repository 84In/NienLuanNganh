import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { Footer, Header, Login } from "./";

const Home = ({ isModelLogin, setIsModelLogin }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {}, [location]);
  return (
    <div className="flex h-full w-full flex-col items-center gap-4">
      <Header isModelLogin={isModelLogin} setIsModelLogin={setIsModelLogin} isLoggedIn={isLoggedIn} />
      {isModelLogin && <Login setIsModelLogin={setIsModelLogin} />}
      <Outlet isModelLogin={isModelLogin} setIsModelLogin={setIsModelLogin} />
      <Footer />
    </div>
  );
};

export default Home;
