import React, { useEffect, useState } from "react";
import { MainContainer } from "../../components";
import { apiUserInfo } from "../../services";
import { useSelector } from "react-redux";

const Home = () => {
  return (
    <div className="flex h-full w-full flex-col items-center gap-4">
      <MainContainer />
    </div>
  );
};

export default Home;
