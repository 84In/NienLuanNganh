import React from 'react'
import ButtonCustom from './ButtonCustom';
import { iconsLeftBar } from '../utils/constant';

const LeftBar = () => {
  return (
    <>
    <div className="text-center text-lg font p-1">Danh mục</div>
    <div className="flex flex-col space-y-2 ">
    {iconsLeftBar.map((item, index) => (
        <div key={index}>
        <ButtonCustom
            Image={item.image}
            TextTitle={item.title}
            HoverColor={'hover:bg-blue-100'}
        />
        </div>
    ))}
    </div>
    </>
  )
}

export default LeftBar