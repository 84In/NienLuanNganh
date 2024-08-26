import React, { memo } from "react";

const SearchBar = ({ IconBefore, TextContent }) => {
  return (
    <div className="w-full flex my-1 rounded-md border border-black">
      {IconBefore && (
        <span className="flex p-1 px-4 py-2 items-center justify-center">
          {<IconBefore size={20} />}
        </span>
      )}
      <input
        className="flex flex-auto items-center justify-center outline-none border-r-2 border-gray-500"
        type="text"
      />
      {TextContent && (
        <span className="flex items-center justify-center">
          <button className="flex flex-1 h-full px-2 items-center justify-center text-blue-600 rounded-r-md hover:bg-blue-200">
            {TextContent}
          </button>
        </span>
      )}
    </div>
  );
};

export default memo(SearchBar);
