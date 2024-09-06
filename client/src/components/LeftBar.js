import { React, memo } from "react";
import ButtonCustom from "./ButtonCustom";
import { iconsLeftBar } from "../utils/constant";
import { Link } from "react-router-dom";

const LeftBar = () => {
  return (
    <div className="sticky top-4 rounded-lg bg-white p-3">
      <div className="max-h-80 overflow-y-auto scroll-smooth md:max-h-screen md:scrollbar-hide">
        <h1 className="p-1 text-center text-lg font-medium">Danh mục</h1>
        <div className="flex flex-col space-y-2">
          {iconsLeftBar.map((item, index) => (
            <Link to={`${item.url}`} key={index}>
              <div>
                <ButtonCustom Image={item.image} TextTitle={item.title} HoverColor={"hover:bg-blue-100"} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(LeftBar);
