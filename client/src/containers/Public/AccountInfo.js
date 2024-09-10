import { Button, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { memo } from "react";
import { BiCurrentLocation, BiEnvelope, BiLockOpenAlt, BiPencil, BiPhone } from "react-icons/bi";
import { ContactButton } from "../../components";
import { useLocation } from "react-router-dom";
import { defaultAvatar } from "../../utils/constant";

const AccountInfo = () => {
  const location = useLocation();
  const user = location.state?.ValueUser;
  const handleSaveChange = () => {};
  const defaultAvatar = require("../../assets/images/profile.png");

  return (
    <Grid2
      container
      rowGap={2}
      columnGap={"none"}
      sx={{ display: "flex", justifyContent: "space-between", width: "100%", paddingX: "1rem", height: "100%" }}
    >
      <Grid2
        container
        sx={{
          flexGrow: 1,
          display: "flex",
          p: 2,
          bgcolor: "white",
          borderRadius: "8px",
          width: "100%",
          height: "fit-content",
        }}
      >
        <Grid2 item xs={12} md={6} sx={{ p: 2 }}>
          <h1 className="mb-4 text-gray-500">Thông tin cá nhân</h1>
          <div className="flex justify-between gap-4">
            <div className="relative h-20 w-20 grid-md:h-24 grid-md:w-24">
              <img
                className="avatar h-full w-full rounded-full border object-cover"
                src={user?.avatar !== null ? user?.avatar : defaultAvatar}
                alt="Avatar"
              />
              <div className="absolute bottom-2 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-500 text-white">
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="fileInput"
                  name="fileInput"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => (document.querySelector(".avatar").src = e.target.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <label htmlFor="fileInput" className="button">
                  <BiPencil />
                </label>
              </div>
            </div>
            <div className="flex w-8/12 flex-col gap-6">
              <div className="flex">
                <h1 className="w-3/12">Họ</h1>
                <div className="w-9/12">
                  <TextField
                    name="firstName"
                    type="text"
                    defaultValue={user?.firstName}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </div>
              </div>
              <div className="flex">
                <h1 className="w-3/12">Tên</h1>
                <div className="w-9/12">
                  <TextField
                    name="lastName"
                    type="text"
                    defaultValue={user?.lastName}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </div>
              </div>
              <div className="flex">
                <h1 className="w-3/12">Ngày sinh</h1>
                <div className="w-9/12">
                  <TextField
                    name="lastName"
                    type="date"
                    defaultValue={user?.dob}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </div>
              </div>
              <Button
                onClick={handleSaveChange}
                variant="contained"
                color="primary"
                size="large"
                className="mb-2 w-full grid-md:w-[60%]"
              >
                Lưu thay đổi
              </Button>
            </div>
          </div>
        </Grid2>
        <Grid2 xs={12} md={6} sx={{ p: 2 }}>
          <h1 className="mb-4 text-gray-500">Thông tin liên lạc</h1>
          <div className="flex flex-col gap-10">
            <ContactButton
              icon={BiPhone}
              title={"Số điện thoại"}
              info={user?.phone}
              nameButton={"Cập nhật"}
              onClick={""}
            />
            <ContactButton
              icon={BiEnvelope}
              title={"Địa chỉ email"}
              info={user?.email}
              nameButton={"Cập nhật"}
              onClick={""}
            />
            <ContactButton
              icon={BiCurrentLocation}
              title={"Địa chỉ"}
              // info={user?.address}
              nameButton={"Cập nhật"}
              onClick={""}
            />
            <ContactButton icon={BiLockOpenAlt} title={"Đổi mật khẩu"} nameButton={"Cập nhật"} onClick={""} />
          </div>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default memo(AccountInfo);
