import React, { memo, useEffect, useState } from "react";
import { AdminNavButton } from "../../";
import { adminSideBar } from "../../../utils/constant";

const AdminSideBar = ({ isOpen, isOpenProp, setIsOpenProp }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Effect để theo dõi kích thước cửa sổ
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 740) {
        setIsVisible(false); // Ẩn sidebar khi chiều rộng nhỏ hơn 740px
      } else {
        setIsVisible(isOpenProp); // Hiện sidebar nếu lớn hơn hoặc bằng 740px và isOpen là true
      }
    };

    handleResize(); // Kiểm tra ngay khi component được mount

    window.addEventListener("resize", handleResize); // Thêm sự kiện resize

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup khi component unmount
    };
  }, [isOpenProp]); // Theo dõi isOpen để cập nhật khi nó thay đổi

  return (
    <>
      {/* Sidebar */}
      {isVisible && (
        <div
          className={`sticky top-2 ml-2 mt-2 flex h-fit ${isOpen ? "w-11/12" : "w-9/12"} flex-col ${isOpen ? "p-4" : "items-center justify-center pb-4 pt-4"} gap-2 rounded-md bg-white transition-all`}
        >
          {adminSideBar?.length > 0 &&
            adminSideBar.map((item, index) => {
              return (
                <div key={index}>
                  <AdminNavButton Icon={item?.icon} path={item?.path} title={isOpen ? item?.name : null} />
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default memo(AdminSideBar);
