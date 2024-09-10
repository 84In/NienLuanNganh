import React, { memo } from "react";
import { Link } from "react-router-dom";
import { formatLengthName } from "../utils/format";

const ButtonCustom = ({
  TypeButton,
  IconBefore,
  Image,
  Avatar,
  ImageSize,
  TextTitle,
  PaddingX,
  Width,
  TextColor,
  FontWeight,
  HoverColor,
  Padding,
  IconSize,
  ClickButton,
}) => {
  return (
    <div
      className={`${PaddingX ? PaddingX : "px-2"} ${FontWeight ? FontWeight : "font-normal"} ${
        Width ? Width : "w-auto"
      } ${HoverColor ? HoverColor : "hover:bg-gray-300"} ${Padding ? Padding : "p-2"} group rounded-md`}
    >
      <button
        type={TypeButton || "button"}
        className={` ${TextColor ? TextColor : "text-gray-800"} relative flex items-center justify-center gap-1`}
        onClick={ClickButton}
      >
        {IconBefore && (
          <>
            <span>
              <IconBefore size={IconSize || "24"} />
            </span>
            <span className="text-left">{TextTitle}</span>
          </>
        )}
        {Image && (
          <>
            <img
              src={Image}
              alt={TextTitle}
              className={`${ImageSize ? ImageSize : "w-8"} ${ImageSize ? ImageSize : "h-8"} object-contain`}
            />
            <span className="text-left">{TextTitle}</span>
          </>
        )}
        {Avatar && (
          <>
            <img
              src={Avatar}
              alt={TextTitle}
              className={`${ImageSize ? ImageSize : "w-full"} ${ImageSize ? ImageSize : "h-6"} rounded-full object-cover`}
            />
            <div className="absolute -right-2 top-8 z-50 hidden w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 group-hover:block">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <Link to={"/account"}>
                  <p className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Thông tin tài khoản
                  </p>
                </Link>
                <Link to={"/logout"}>
                  <p className="block cursor-pointer px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Đăng xuất</p>
                </Link>
              </div>
            </div>
            <span className="text-left">{formatLengthName(TextTitle)}</span>
          </>
        )}
      </button>
    </div>
  );
};

export default memo(ButtonCustom);
