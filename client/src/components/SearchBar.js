import React, { memo } from "react";

const SearchBar = ({ IconBefore, TextContent }) => {
  return (
    <div className="my-1 flex w-full rounded-md border border-gray-400">
      {IconBefore && <span className="flex items-center justify-center p-1 px-4 py-2">{<IconBefore size={20} />}</span>}
      <input
        className="flex flex-auto items-center justify-center border-r-[1px] border-gray-400 outline-none"
        type="text"
      />
      {TextContent && (
        <span className="flex items-center justify-center">
          <button className="flex h-full flex-1 items-center justify-center rounded-r-md px-2 text-sm font-bold text-blue-600 hover:bg-blue-200">
            {TextContent}
          </button>
        </span>
      )}
    </div>
  );
};

export default memo(SearchBar);