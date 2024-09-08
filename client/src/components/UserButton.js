import React, { memo } from "react";
import { ProfileUser } from "./";

const UserButton = ({ DataImage, Name, isModelUser, setIsModelUser }) => {
  const dataName = () => {
    if (Name?.length > 24) {
      return Name?.slice(0, 21) + "...";
    }
    return Name;
  };
  return (
    <div className="flex cursor-pointer flex-col">
      <div className="m-0 flex items-center justify-center border border-red-600" onClick={setIsModelUser}>
        <img src={DataImage} className="m-1 h-10 w-10 rounded-full border-2 border-gray-500" />
        <span className="font-semibold">{dataName()}</span>
      </div>
      {isModelUser && <ProfileUser />}
    </div>
  );
};

export default memo(UserButton);
