import { Button, InputAdornment, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { memo } from "react";
import { BiCurrentLocation, BiEnvelope, BiLockOpenAlt, BiPhone } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { path } from "../utils/constant";
import ButtonCustom from "./ButtonCustom";

const EditContact = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Grid2
      container
      rowGap={2}
      columnGap={"none"}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        paddingX: "1rem",
        height: "100%",
        position: "relative",
      }}
    >
      <div className="absolute flex items-center gap-1 p-2 text-lg capitalize">
        <ButtonCustom
          TypeButton={"button"}
          FontWeight={"font-medium"}
          HoverColor={"hover:bg-gray-200"}
          ClickButton={() => navigate(-1)}
          IconBefore={IoIosArrowBack}
          TextTitle={"Quay lại"}
        />
      </div>
      <Grid2
        item
        container
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          p: 2,
          bgcolor: "white",
          borderRadius: "8px",
          rowGap: "1rem",
          width: "100%",
          height: "fit-content",
        }}
      >
        {location.pathname.includes(path.EDIT_PHONE) && (
          <div className="flex w-[400px] flex-col gap-6 rounded-lg border border-gray-400 p-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-left">Số điện thoại</h1>
              <TextField
                name="phone"
                size="small"
                defaultValue={location.state?.phone ? location.state?.phone : ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BiPhone className="h-6 w-6 text-gray-500" />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                fullWidth
              />
            </div>
            <Button onClick={""} variant="contained" color="primary" size="large" className="mb-2 w-full">
              Lưu thay đổi
            </Button>
          </div>
        )}
        {location.pathname.includes(path.EDIT_EMAIL) && (
          <div className="flex w-[400px] flex-col gap-4 rounded-lg border border-gray-400 p-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-left">Email</h1>
              <TextField
                name="email"
                size="small"
                defaultValue={location.state?.email ? location.state?.email : ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BiEnvelope className="h-6 w-6 text-gray-500" />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                fullWidth
              />
            </div>
            <Button onClick={""} variant="contained" color="primary" size="large" className="mb-2 w-full">
              Lưu thay đổi
            </Button>
          </div>
        )}
        {location.pathname.includes(path.EDIT_ADDRESS) && (
          <div className="flex w-[400px] flex-col gap-4 rounded-lg border border-gray-400 p-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-left">Địa chỉ</h1>
              <TextField
                name="address"
                size="small"
                defaultValue={location.state?.address ? location.state?.address : ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BiCurrentLocation className="h-6 w-6 text-gray-500" />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                fullWidth
              />
            </div>
            <Button onClick={""} variant="contained" color="primary" size="large" className="mb-2 w-full">
              Lưu thay đổi
            </Button>
          </div>
        )}
        {location.pathname.includes(path.EDIT_PASSWORD) && (
          <div className="flex w-[400px] flex-col gap-4 rounded-lg border border-gray-400 p-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-left">Mật khẩu cũ</h1>
              <TextField
                name="oldPassword"
                size="small"
                type="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BiLockOpenAlt className="h-6 w-6 text-gray-500" />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                fullWidth
                defaultValue=""
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-left">Mật khẩu mới</h1>
              <TextField
                name="newPassword"
                size="small"
                type="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BiLockOpenAlt className="h-6 w-6 text-gray-500" />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                fullWidth
                defaultValue=""
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-left">Nhập lại mật khẩu mới</h1>
              <TextField
                name="reNewPassword"
                size="small"
                type="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BiLockOpenAlt className="h-6 w-6 text-gray-500" />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                fullWidth
                defaultValue=""
                autoComplete="off"
              />
            </div>
            <Button onClick={""} variant="contained" color="primary" size="large" className="mb-2 w-full">
              Lưu thay đổi
            </Button>
          </div>
        )}
      </Grid2>
    </Grid2>
  );
};

export default memo(EditContact);
