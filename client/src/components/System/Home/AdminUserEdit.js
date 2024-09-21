import React from "react";

const AdminUserEdit = ({ user }) => {
  const CSS_HEADING = "font-semibold text-xl";
  return (
    <div className="flex flex-col">
      <div className="flex w-full items-center justify-center">
        {user ? (
          <span className={CSS_HEADING}>Cập nhật tài khoản</span>
        ) : (
          <span className={CSS_HEADING}>Tạo tài khoản mới</span>
        )}
      </div>
      <div className="mt-2 border border-green-300">align</div>
    </div>
  );
};

export default AdminUserEdit;
