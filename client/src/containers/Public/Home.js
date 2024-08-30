import React from "react";
import { Header } from ".";
import { MainContainer } from "../../components";

const Home = () => {
  return (
    <div className="w-full flex flex-col gap-5 items-center h-full px-20">
      <Header />
      <MainContainer />
    </div>
  );
};

export default Home;
