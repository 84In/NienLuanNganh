import React, { memo } from "react";

const DotAlert = ({ Content }) => {
  return (
    <div className="bg-red-600 text-white rounded-full size-1 flex items-center justify-center p-2 absolute top-[-5px] left-6">
      <span className="p-2 font-medium text-center text-[10px]">
        {Content ? Content : "0"}
      </span>
    </div>
  );
};

export default memo(DotAlert);
