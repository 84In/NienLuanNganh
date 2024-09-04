import React, { useState } from "react";
import { Header, Login, MainContainer } from ".";

const Home = () => {
  const [isModelLogin, setisModelLogin] = useState(false);

  // const toggleModelLogin = () => setisModelLogin((prevState) => !prevState);

  console.log(isModelLogin);

  return (
    <div className="flex h-full w-full flex-col items-center gap-4">
      <Header isModelLogin={isModelLogin} setIsModelLogin={setisModelLogin} />
      <MainContainer />
      {isModelLogin && <Login setIsModelLogin={setisModelLogin} />}
    </div>
  );
};

export default Home;
