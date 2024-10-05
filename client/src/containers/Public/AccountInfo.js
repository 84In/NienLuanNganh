import { Alert, AlertTitle, Button, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { memo, useEffect, useState } from "react";
import { BiCurrentLocation, BiEnvelope, BiLockOpenAlt, BiPencil, BiPhone } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { ContactButton } from "../../components";
import { path } from "../../utils/constant";
import { apiChangePersonalInfomation, apiUploadAvatar } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../store/actions";

const defaultAvatar = require("../../assets/images/profile.png");

const AccountInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.user);

  const [avatarFile, setAvatarFile] = useState();
  const [alert, setAlert] = useState("");
  const [payload, setPayload] = useState({
    username: "",
    firstName: "",
    lastName: "",
    dob: "",
    avatar: "",
  });

  useEffect(() => {
    if (userData && username) {
      setPayload({
        username: userData.username || username,
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        dob: userData.dob ? userData.dob.split("T")[0] : "",
        avatar: userData.avatar || "",
      });
    }
  }, [userData, username]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPayload({ ...payload, [name]: value });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSaveChange(event);
    }
  };

  const handleUploadAvatar = async (file) => {
    const validImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!file) {
      setAlert("Không có tập tin nào được cung cấp");
      return;
    }
    if (!validImageTypes.includes(file.type)) {
      setAlert("Tập tin hình ảnh không hợp lệ! (JPEG, JPG, PNG & GIF)");
      return;
    }

    const formData = new FormData();
    formData.append("files", file);
    const avatarResponse = await apiUploadAvatar(userData.username, formData);

    if (avatarResponse && avatarResponse.result && avatarResponse.result.length > 0) {
      const avatarPath = avatarResponse.result[0];
      setPayload((prev) => ({ ...prev, avatar: avatarPath }));
      console.log("Avatar uploaded successfully: ", avatarPath);
      setAvatarFile(undefined);
      return avatarPath;
    } else {
      setAlert("Lỗi tải ảnh lên");
    }
    setTimeout(() => setAlert(""), 5000);
  };

  const handleSaveChange = async (e) => {
    e.preventDefault();
    try {
      const avatarPath = await handleUploadAvatar(avatarFile);
      const updatedPayload = {
        ...payload,
        avatar: avatarPath || payload.avatar,
        username: payload.username.trim(),
        firstName: payload.firstName.trim(),
        lastName: payload.lastName.trim(),
        dob: payload.dob.trim(),
      };

      // Check if there are any changes
      if (Object.keys(updatedPayload).some((key) => updatedPayload[key] !== userData[key])) {
        const response = await apiChangePersonalInfomation({
          ...updatedPayload,
        });
        dispatch(action.getUserInfo(username)); // Dispatch action to update user info in Redux store
        setAlert("Thay đổi thành công!");
      } else {
        setAlert("Không có thay đổi nào!");
      }
      setTimeout(() => setAlert(""), 5000);
    } catch (error) {
      console.error(error.message);
    }
  };

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
        <Grid2 item xs={12} md={6} sx={{ px: { xs: 0, md: 2 }, py: 2 }}>
          <h1 className="mb-4 text-lg font-semibold">Thông tin cá nhân</h1>
          <div className="flex justify-between gap-4">
            <div className="relative h-20 w-20 grid-md:h-24 grid-md:w-24">
              <img
                className="avatarShow h-full w-full rounded-full border border-black object-cover"
                src={userData?.avatar ? process.env.REACT_APP_SERVER_URL + userData.avatar : defaultAvatar}
                alt="Avatar"
              />
              <div className="absolute bottom-2 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-500 text-white hover:bg-gray-800">
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="avatarInput"
                  name="avatar"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        const avatarImage = document.querySelector(".avatarShow");
                        avatarImage.src = e.target.result;
                        setAvatarFile(file);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <label htmlFor="avatarInput" className="cursor-pointer">
                  <BiPencil />
                </label>
              </div>
            </div>
            <div className="flex w-8/12 flex-col gap-6">
              <div className="flex">
                <h1 className="w-3/12 text-gray-500">Họ</h1>
                <div className="w-9/12">
                  <TextField
                    name="firstName"
                    type="text"
                    value={payload.firstName}
                    variant="outlined"
                    size="small"
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    fullWidth
                  />
                </div>
              </div>
              <div className="flex">
                <h1 className="w-3/12 text-gray-500">Tên</h1>
                <div className="w-9/12">
                  <TextField
                    name="lastName"
                    type="text"
                    value={payload.lastName}
                    variant="outlined"
                    size="small"
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    fullWidth
                  />
                </div>
              </div>
              <div className="flex">
                <h1 className="w-3/12 text-gray-500">Ngày sinh</h1>
                <div className="w-9/12">
                  <TextField
                    name="dob"
                    type="date"
                    value={payload.dob}
                    variant="outlined"
                    size="small"
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
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
        <Grid2 xs={12} md={6} sx={{ px: { xs: 0, md: 2 }, py: 2 }}>
          <h1 className="mb-4 text-lg font-semibold">Thông tin liên lạc</h1>
          <div className="flex flex-col gap-10">
            <ContactButton
              icon={BiPhone}
              title={"Số điện thoại"}
              info={userData?.phone}
              nameButton={"Cập nhật"}
              onClick={() => navigate(path.EDIT_PHONE, { state: { phone: userData?.phone } })}
            />
            <ContactButton
              icon={BiEnvelope}
              title={"Địa chỉ email"}
              info={userData?.email}
              nameButton={"Cập nhật"}
              onClick={() => navigate(path.EDIT_EMAIL, { state: { email: userData?.email } })}
            />
            <ContactButton
              icon={BiCurrentLocation}
              title={"Địa chỉ"}
              info={userData?.address?.fullName}
              nameButton={"Cập nhật"}
              onClick={() => navigate(path.EDIT_ADDRESS, { state: { address: userData?.address } })}
            />
            <ContactButton
              icon={BiLockOpenAlt}
              title={"Đổi mật khẩu"}
              nameButton={"Cập nhật"}
              onClick={() => navigate(path.EDIT_PASSWORD)}
            />
          </div>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default memo(AccountInfo);
