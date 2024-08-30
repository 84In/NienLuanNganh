import React from 'react';
import logo from '../../assets/images/logo.png';
import { ButtonCustom, DotAlert, SearchBar } from '../../components';
import icons from '../../utils/icons';

const { GoHomeFill, FaRegCircleUser, FaCartShopping, GoSearch } = icons;

const Header = () => {
  return (
    <div className="bg-white border border-red-500 h-[90px] w-screen flex">
      <div className="logo m-2 w-2/12">
        <img className="w-[100px] h-[70px] object-contain" src={logo} alt="logo" />
      </div>
      <div className="w-4/6 flex flex-col justify-center">
        <div className="w-full flex justify-center items-center">
          <SearchBar IconBefore={GoSearch} TextContent={'Tìm kiếm'} />
        </div>
        <div className="flex items-center justify-start">Nav Bar</div>
      </div>
      <div className="w-2/6 flex flex-col justify-center">
        <div className="w-full flex">
          <div className="flex justify-center items-center w-2/3">
            <ButtonCustom
              TypeButton={'button'}
              TextColor={'text-blue-600'}
              TextTitle={'Trang chủ'}
              FontWeight={'font-medium'}
              HoverColor={'hover:bg-blue-100'}
              PaddingX={'px-4'}
              IconBefore={GoHomeFill}
            />
            <ButtonCustom
              IconBefore={FaRegCircleUser}
              TypeButton={'button'}
              TextTitle={'Tài khoản'}
              FontWeight={'font-medium'}
              PaddingX={'px-4'}
            />
          </div>
          <span className="text-gray-200 p-4">|</span>
          <div className="flex w-1/3 justify-start items-center">
            <ButtonCustom
              TypeButton={'button'}
              IconBefore={FaCartShopping}
              TextColor={'text-blue-600'}
              FontWeight={'font-medium'}
              HoverColor={'hover:bg-blue-100'}
              TextTitle={<DotAlert />}
              PaddingX={'px-8'}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">Giao đến ABC</div>
      </div>
    </div>
  );
};

export default Header;
