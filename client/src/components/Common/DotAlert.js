import React, { memo } from "react";

const DotAlert = ({ number }) => {
  return (
    <div className="absolute left-5 top-[-5px] flex size-1 items-center justify-center rounded-full bg-red-600 p-2 text-white">
      <p className="p-2 text-center text-[10px] font-medium">{number ? number : "0"}</p>
    </div>
  );
};

export default memo(DotAlert);
