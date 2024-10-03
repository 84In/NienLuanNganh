import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { memo, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AdminSideBar } from "../../components";
import { AdminHeader } from "./";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions";

const AdminHome = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (user === null || user === undefined || !user?.roles.some((role) => role.name === "ADMIN")) {
    navigate("/");
  }

  useEffect(() => {
    dispatch(actions.getRoles());
    dispatch(actions.getProvinces());
  }, [dispatch]);

  const [isOpen, setIsOpen] = useState(true);
  const [isOpenProp, setIsOpenProps] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 876) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-full min-h-screen w-full overflow-hidden">
      {" "}
      {/* Thêm overflow-hidden nếu cần */}
      <Grid2 container sx={{ width: "100%" }}>
        {/* Header full màn hình */}
        <Grid2 item xs={12}>
          <AdminHeader toggleSidebar={toggleSidebar} user={user} />
        </Grid2>
        <Grid2 container xs={12} sx={{ flexGrow: 1 }}>
          {" "}
          {/* Thêm flexGrow để chiếm không gian còn lại */}
          <Grid2 item xs={isOpen ? 3 : 0} sm={isOpen ? 3 : 1} sx={{ transition: "width 0.3s" }}>
            <AdminSideBar isOpen={isOpen} isOpenProp={isOpenProp} setIsOpenProps={setIsOpenProps} />
          </Grid2>
          {/* Nội dung chính chiếm 9 cột nếu sidebar mở, 12 cột nếu sidebar đóng */}
          <Grid2
            item
            xs={isOpen ? 9 : 12}
            sm={isOpen ? 9 : 11}
            sx={{
              transition: "width 0.3s",
            }}
          >
            <Outlet />
          </Grid2>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default memo(AdminHome);
