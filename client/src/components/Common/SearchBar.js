import React, { memo } from "react";

const SearchBar = ({ isAdmin, IconBefore, TextContent, Name, valueSearch, setValueSearch, onSearch }) => {
  return (
    <div className={`my-1 flex w-full rounded-md ${isAdmin ? "bg-white" : ""} border border-gray-400`}>
      {IconBefore && (
        <div className="flex items-center justify-center">
          <span className="flex items-center justify-center px-3 py-2 text-gray-400">{<IconBefore size={20} />}</span>
        </div>
      )}
      <input
        name={Name}
        className={`flex min-w-40 flex-auto items-center justify-center border-r-[1px] px-2 outline-none ${TextContent ? "" : "rounded-r-md"}`}
        type="text"
        autoComplete="off"
        value={valueSearch}
        onChange={(e) => setValueSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSearch();
          }
        }}
        placeholder={isAdmin && "Search..."}
      />
      {TextContent && (
        <div className="flex w-20 items-center justify-center">
          <button
            className={`flex h-full flex-1 items-center justify-center rounded-r-md px-2 text-sm font-bold ${isAdmin ? "" : "text-blue-600"} hover:bg-blue-200`}
            onClick={onSearch}
          >
            {TextContent}
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(SearchBar);
