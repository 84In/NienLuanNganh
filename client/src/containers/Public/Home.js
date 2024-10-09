import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Footer, Header, Login } from "./";

const Home = ({ User, cart, isModelLogin, setIsModelLogin }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <div className="flex h-full w-full flex-col items-center gap-4">
      <Header User={User} cart={cart} setIsModelLogin={setIsModelLogin} isLoggedIn={isLoggedIn} />
      {isModelLogin && <Login setIsModelLogin={setIsModelLogin} />}
      <Outlet isModelLogin={isModelLogin} setIsModelLogin={setIsModelLogin} />
      <Footer />
    </div>
  );
};

export default memo(Home);
