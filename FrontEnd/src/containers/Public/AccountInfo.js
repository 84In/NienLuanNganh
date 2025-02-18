import { Button, FormControl, FormHelperText, OutlinedInput } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { memo, useEffect, useState } from "react";
import { BiCurrentLocation, BiEnvelope, BiLockOpenAlt, BiPencil, BiPhone, BiSolidPencil } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AlertCustom, ContactButton } from "../../components";
import { apiChangePersonalInfomation, apiUploadAvatar } from "../../services";
import * as action from "../../store/actions";
import { path } from "../../utils/constant";

const defaultAvatar = require("../../assets/images/profile.png");

const AccountInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.user);

  const [avatarFile, setAvatarFile] = useState();
  const [alert, setAlert] = useState("");
  const [invalidKeys, setInvalidKeys] = useState("");
  const [payload, setPayload] = useState({
    username: username || "",
    firstName: "",
    lastName: "",
    dob: "",
    avatar: null,
  });

  useEffect(() => {
    if (userData && username) {
      setPayload({
        username: username,
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        dob: userData.dob ? userData.dob.split("T")[0] : "",
        avatar: userData.avatar || null,
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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      if (!validImageTypes.includes(file.type)) {
        setAlert("Tập tin hình ảnh không hợp lệ! (JPEG, JPG, PNG & GIF)");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const avatarImage = document.querySelector(".avatarShow");
        avatarImage.src = e.target.result;
        setAvatarFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadAvatar = async (file) => {
    const validImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!file) {
      return null;
    }
    if (!validImageTypes.includes(file.type)) {
      setAlert("Tập tin hình ảnh không hợp lệ! (JPEG, JPG, PNG & GIF)");
      return null;
    }

    const formData = new FormData();
    formData.append("files", file);
    const avatarResponse = await apiUploadAvatar(userData.username, formData);

    if (avatarResponse && avatarResponse.result && avatarResponse.result.length > 0) {
      const avatarPath = avatarResponse.result[0];
      setPayload((prev) => ({ ...prev, avatar: avatarPath }));
      setAvatarFile();
      return avatarPath;
    } else {
      setAlert("Lỗi tải ảnh lên");
    }
  };

  const handleSaveChange = async (e) => {
    e.preventDefault();
    try {
      const avatarPath = await handleUploadAvatar(avatarFile);
      const updatedPayload = {
        ...payload,
        username: username,
        avatar: avatarPath || payload.avatar,
        firstName: payload.firstName.trim(),
        lastName: payload.lastName.trim(),
        dob: payload.dob.trim(),
      };

      if (!payload.firstName.trim() || !payload.lastName.trim() || !payload.dob.trim()) {
        setAlert("Các trường thông tin không được để trống");
        return;
      }

      // Compare the updatedPayload with the original userData
      const hasChanges = Object.keys(updatedPayload).some((key) => updatedPayload[key] !== userData[key]);
      if (hasChanges) {
        const response = await apiChangePersonalInfomation(updatedPayload);
        if (response?.code === 201) {
          setInvalidKeys(response.result);
          return;
        }
        setInvalidKeys({});
        dispatch(action.getUserInfo(username));
        setAlert("Thay đổi thành công!");
      } else {
        setInvalidKeys({});
        setAlert("Không có thay đổi nào!");
      }
    } catch (error) {
      setAlert("Lỗi!");
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
      {alert && <AlertCustom open={true} title={"Thông báo"} content={alert} onClose={() => setAlert("")} />}
      <Grid2
        item
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
                src={
                  userData?.avatar
                    ? (process.env.NODE_ENV === "production"
                        ? process.env.REACT_APP_SERVER_URL_PROD
                        : process.env.REACT_APP_SERVER_URL_DEV) + userData.avatar
                    : defaultAvatar
                }
                alt="Avatar"
              />
              <div className="absolute bottom-2 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-500 text-white hover:bg-gray-800">
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="avatarInput"
                  name="avatar"
                  accept="image/jpeg, image/jpg, image/png, image/gif"
                  onChange={handleAvatarChange}
                />
                <label htmlFor="avatarInput" className="cursor-pointer">
                  <BiSolidPencil />
                </label>
              </div>
            </div>
            <div className="flex w-8/12 flex-col gap-6">
              <div className="flex">
                <h1 className="w-3/12 text-gray-500">Họ</h1>
                <div className="w-9/12">
                  <FormControl fullWidth variant="outlined" size="small">
                    <OutlinedInput
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={payload.firstName}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                    />
                    {invalidKeys?.firstName && <FormHelperText error>{invalidKeys?.firstName}</FormHelperText>}
                  </FormControl>
                </div>
              </div>
              <div className="flex">
                <h1 className="w-3/12 text-gray-500">Tên</h1>
                <div className="w-9/12">
                  <FormControl fullWidth variant="outlined" size="small">
                    <OutlinedInput
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={payload.lastName}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                    />
                    {invalidKeys?.lastName && <FormHelperText error>{invalidKeys?.lastName}</FormHelperText>}
                  </FormControl>
                </div>
              </div>
              <div className="flex">
                <h1 className="w-3/12 text-gray-500">Ngày sinh</h1>
                <div className="w-9/12">
                  <FormControl fullWidth variant="outlined" size="small">
                    <OutlinedInput
                      name="dob"
                      type="date"
                      value={payload.dob}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                    />
                    {invalidKeys?.dob && <FormHelperText error>{invalidKeys?.dob}</FormHelperText>}
                  </FormControl>
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
              onClick={() => navigate(path.ACCOUNT_EDIT_PHONE, { state: { phone: userData?.phone } })}
            />
            <ContactButton
              icon={BiEnvelope}
              title={"Địa chỉ email"}
              info={userData?.email}
              nameButton={"Cập nhật"}
              onClick={() => navigate(path.ACCOUNT_EDIT_EMAIL, { state: { email: userData?.email } })}
            />
            <ContactButton
              icon={BiCurrentLocation}
              title={"Địa chỉ"}
              info={userData?.address?.fullName}
              nameButton={"Cập nhật"}
              onClick={() => navigate(path.ACCOUNT_EDIT_ADDRESS, { state: { address: userData?.address } })}
            />
            <ContactButton
              icon={BiLockOpenAlt}
              title={"Đổi mật khẩu"}
              nameButton={"Cập nhật"}
              onClick={() => navigate(path.ACCOUNT_EDIT_PASSWORD)}
            />
          </div>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default memo(AccountInfo);
