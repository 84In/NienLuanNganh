import React from "react";
import { Header } from ".";
import MainContainer from "./MainContainer";

const Home = () => {
  return (
    <div className="flex h-full w-full flex-col items-center gap-4">
      <Header />
      <MainContainer />
    </div>
  );
};

export default Home;
