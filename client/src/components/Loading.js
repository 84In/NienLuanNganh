import { Loader2 } from "lucide-react";
import React, { memo } from "react";

const Loading = () => {
  return (
    <div className="fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-white">
      <Loader2 className="h-16 w-16 animate-spin text-primary-color" />
      <h2 className="mt-4 text-2xl font-semibold">Loading...</h2>
      <p className="mt-2">Xin hãy chờ đợi trong giây lát.</p>
    </div>
  );
};

export default memo(Loading);
