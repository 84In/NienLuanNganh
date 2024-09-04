import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { ButtonCustom, DotAlert, SearchBar } from "../../components";
import icons from "../../utils/icons";

const { GoHomeFill, FaRegCircleUser, FaCartShopping, GoSearch } = icons;

const Header = () => {
  const navigate = useNavigate();

  const [isModelLogin, setIsModelLogin] = useState(false);

  return (
    <div className="flex h-[90px] w-full justify-between bg-white px-8">
      <div className="logo m-2 flex w-2/12 items-center">
        <img className="h-[70px] w-[100px] object-contain" src={logo} alt="logo" />
      </div>
      <div className="flex w-3/6 flex-col justify-center">
        <div className="w- flex items-center justify-center">
          <SearchBar IconBefore={GoSearch} TextContent={"Tìm kiếm"} />
        </div>
        {/* <div className="flex items-center justify-start">Nav Bar</div> */}
      </div>
      <div className="flex w-2/6 flex-col justify-center">
        <div className="flex w-full">
          <div className="flex w-2/3 items-center justify-center gap-1">
            <ButtonCustom
              TypeButton={"button"}
              TextColor={"text-blue-600"}
              TextTitle={"Trang chủ"}
              FontWeight={"font-medium"}
              HoverColor={"hover:bg-blue-100"}
              PaddingX={"px-4"}
              IconBefore={GoHomeFill}
              ClickButton={() => navigate("/")}
            />
            <ButtonCustom
              IconBefore={FaRegCircleUser}
              TypeButton={"button"}
              TextTitle={"Tài khoản"}
              FontWeight={"font-medium"}
              PaddingX={"px-4"}
              ClickButton={() => {
                setIsModelLogin(!isModelLogin);
              }}
            />
          </div>
          <span className="p-4 text-gray-200">|</span>
          <div className="flex w-1/3 items-center justify-start">
            <ButtonCustom
              TypeButton={"button"}
              IconBefore={FaCartShopping}
              TextColor={"text-blue-600"}
              FontWeight={"font-medium"}
              HoverColor={"hover:bg-blue-100"}
              TextTitle={<DotAlert />}
              PaddingX={"px-8"}
              ClickButton={() => navigate("/cart")}
            />
          </div>
        </div>
        {/* <div className="flex items-center justify-center">Giao đến ABC</div> */}
      </div>
    </div>
  );
};

export default memo(Header);
