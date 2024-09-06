import React, { memo } from "react";

const DotAlert = ({ Content }) => {
  return (
    <div className="absolute left-5 top-[-8px] flex size-1 items-center justify-center rounded-full bg-red-600 p-2 text-white">
      <span className="p-2 text-center text-[10px] font-medium">{Content ? Content : "0"}</span>
    </div>
  );
};

export default memo(DotAlert);
