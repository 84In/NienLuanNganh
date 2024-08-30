import { React, memo } from "react";
import ButtonCustom from "./ButtonCustom";
import { iconsLeftBar } from "../utils/constant";
import { Link } from "react-router-dom";

const LeftBar = () => {
  return (
    <>
      <div className="max-h-screen overflow-y-auto px-3 pb-3 scrollbar-hide">
        <div className="font p-1 text-center text-lg">Danh mục</div>
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
    </>
  );
};

export default memo(LeftBar);
