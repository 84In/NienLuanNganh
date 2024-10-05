import { Alert, AlertTitle, Button, InputAdornment, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { memo, useEffect, useState } from "react";
import { BiCurrentLocation, BiEnvelope, BiLockOpenAlt, BiPhone } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { path } from "../utils/constant";
import ButtonCustom from "./ButtonCustom";
import { apiChangeContactInfomation } from "../services";
import * as action from "../store/actions/";

const EditContact = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.user);

  const isEditPhone = location.pathname.includes(path.EDIT_PHONE);
  const isEditEmail = location.pathname.includes(path.EDIT_EMAIL);
  const isEditAddress = location.pathname.includes(path.EDIT_ADDRESS);
  const isEditPassword = location.pathname.includes(path.EDIT_PASSWORD);

  const [alert, setAlert] = useState("");
  const [payload, setPayload] = useState({
    username: username || "",
    phone: "",
    email: "",
    address: "",
    province: "",
    district: "",
    ward: "",
  });

  useEffect(() => {
    if (userData && username) {
      setPayload((prev) => ({
        ...prev,
        username: username,
        phone: userData.phone,
        email: userData.email,
        address: userData.address,
        province: userData.province,
        district: userData.district,
        ward: userData.ward,
      }));
    }
  }, [userData, username]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPayload({ ...payload, [name]: value });
  };

  const handleSubmitChangeContact = async (e) => {
    e.preventDefault();
    try {
      if ((payload.phone !== userData.phone && payload.phone) || (payload.email !== userData.email && payload.email)) {
        const response = await apiChangeContactInfomation({
          username: payload.username.trim(),
          phone: payload.phone.trim(),
          email: payload.email.trim(),
        });
        console.log(response);
        if (response.code === 0) {
          setAlert("Thay đổi thành công!");
          dispatch(action.getUserInfo(username));
        }
        if (response.code === 304) {
          setAlert("Số điện thoại đã tồn tại!");
        }
      } else {
        setAlert("Không có thay đổi nào!");
      }
      setTimeout(() => {
        setAlert("");
      }, 5000);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmitChangePassword = async (e) => {
    e.preventDefault();
  };

  const handleChangeAddress = async (e) => {
    e.preventDefault();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (event.target.name === "phone" || event.target.name === "email") {
        handleSubmitChangeContact(event);
      } else if (
        event.target.name === "oldPassword" ||
        event.target.name === "newPassword" ||
        event.target.name === "reNewPassword"
      ) {
        handleSubmitChangePassword(event);
      } else if (event.target.name === "address") {
        handleChangeAddress(event);
      }
    }
  };

  console.log(payload);

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
      {alert && (
        <Alert severity="info" className="fixed right-2 top-4 z-50 w-[450px] border shadow-md">
          <AlertTitle>Thông báo</AlertTitle>
          {alert}
        </Alert>
      )}
      <div className="absolute flex items-center gap-1 p-2 text-lg">
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
          paddingTop: { xs: 8, md: 2 },
          bgcolor: "white",
          borderRadius: "8px",
          rowGap: "1rem",
          width: "100%",
          height: "fit-content",
        }}
      >
        {isEditPhone && (
          <div className="flex w-[400px] flex-col gap-6 rounded-lg border border-gray-400 p-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-left">Số điện thoại</h1>
              <TextField
                name="phone"
                size="small"
                value={payload.phone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BiPhone className="h-6 w-6 text-gray-500" />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                fullWidth
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button
              onClick={handleSubmitChangeContact}
              variant="contained"
              color="primary"
              size="large"
              className="mb-2 w-full"
            >
              Lưu thay đổi
            </Button>
          </div>
        )}
        {isEditEmail && (
          <div className="flex w-[400px] flex-col gap-4 rounded-lg border border-gray-400 p-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-left">Email</h1>
              <TextField
                name="email"
                size="small"
                value={payload.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BiEnvelope className="h-6 w-6 text-gray-500" />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                fullWidth
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button
              onClick={handleSubmitChangeContact}
              variant="contained"
              color="primary"
              size="large"
              className="mb-2 w-full"
            >
              Lưu thay đổi
            </Button>
          </div>
        )}
        {isEditAddress && (
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
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button onClick={""} variant="contained" color="primary" size="large" className="mb-2 w-full">
              Lưu thay đổi
            </Button>
          </div>
        )}
        {isEditPassword && (
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
                autoComplete="new-password"
                onKeyDown={handleKeyDown}
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
                autoComplete="new-password"
                onKeyDown={handleKeyDown}
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
                autoComplete="new-password"
                onKeyDown={handleKeyDown}
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
