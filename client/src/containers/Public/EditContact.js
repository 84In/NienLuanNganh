import { Alert, AlertTitle, Button, FormControl, InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { memo, useEffect, useState } from "react";
import { BiCurrentLocation, BiEnvelope, BiLockOpenAlt, BiPhone } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { path } from "../../utils/constant";
import ButtonCustom from "../../components/ButtonCustom";
import { apiChangeAddress, apiChangeContactInfomation, apiChangePassword } from "../../services";
import * as actions from "../../store/actions/";

const EditContact = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.user);
  const { provinces, districts, wards } = useSelector((state) => state.app);

  const isEditPhone = location.pathname.includes(path.EDIT_PHONE);
  const isEditEmail = location.pathname.includes(path.EDIT_EMAIL);
  const isEditAddress = location.pathname.includes(path.EDIT_ADDRESS);
  const isEditPassword = location.pathname.includes(path.EDIT_PASSWORD);

  const [alert, setAlert] = useState("");
  const [invalidKeys, setInvalidKeys] = useState({});
  // User information
  const [payload, setPayload] = useState({
    username: username || "",
    phone: "",
    email: "",
    address: {
      fullName: "",
      province: "",
      district: "",
      ward: "",
      street: "",
    },
    oldPassword: "",
    newPassword: "",
    reNewPassword: "",
  });

  useEffect(() => {
    if (userData && username) {
      setPayload((prev) => ({
        ...prev,
        username: username,
        phone: userData.phone || "",
        email: userData.email || "",
        address: {
          fullName: userData.address?.fullName || "",
          province: userData.address?.province?.id || "",
          district: userData.address?.district?.id || "",
          ward: userData.address?.ward?.id || "",
          street: userData.address?.street || "",
        },
      }));
      setProvince(userData.address?.province?.id || "");
      setDistrict(userData.address?.district?.id || "");
      setWard(userData.address?.ward?.id || "");
      setStreet(userData.address?.street || "");
    }
  }, [userData, username]);

  // Address information
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [street, setStreet] = useState("");

  useEffect(() => {
    dispatch(actions.getProvinces());
  }, [dispatch]);

  useEffect(() => {
    if (province !== "") {
      dispatch(actions.getDistrictsByProvince(province));
    }
  }, [province, dispatch]);

  useEffect(() => {
    if (district !== "") {
      dispatch(actions.getWardsByDistrict(district));
    }
  }, [district, dispatch]);

  useEffect(() => {
    const provinceObj = provinces.find((item) => item.id === province);
    const districtObj = district && districts && districts.find((item) => item.id === district);
    const wardObj = ward && wards && wards.find((item) => item.id === ward);

    const fullName =
      (street ? street.trim() + ", " : "") +
      (wardObj ? wardObj?.name + ", " : "") +
      (districtObj ? districtObj?.name + ", " : "") +
      (provinceObj ? provinceObj?.name : "");
    setPayload((prev) => ({
      ...prev,
      address: {
        fullName: fullName,
        province: provinceObj ? provinceObj?.id : "",
        district: districtObj ? districtObj?.id : "",
        ward: wardObj ? wardObj?.id : "",
        street: street,
      },
    }));
  }, [province, district, ward, street]);

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
        if (response.code === 0) {
          setInvalidKeys({});
          setAlert("Thay đổi thành công!");
          dispatch(actions.getUserInfo(username));
        }
        if (response?.code === 304) {
          setAlert("Số điện thoại đã tồn tại!");
        }
        if (response?.code === 201) {
          setInvalidKeys(response?.result);
          return;
        }
      } else {
        setAlert("Không có thay đổi nào!");
        setInvalidKeys({});
      }
    } catch (error) {
      setAlert("Lỗi!");
    }
    setTimeout(() => {
      setAlert("");
    }, 5000);
  };

  const handleSubmitChangePassword = async (e) => {
    e.preventDefault();
    try {
      if (payload.newPassword !== payload.reNewPassword) {
        setAlert("Mật khẩu mới và xác nhận không khớp!");
        setTimeout(() => setAlert(""), 5000);
        return;
      }
      const response = await apiChangePassword({
        username: payload.username.trim(),
        oldPassword: payload.oldPassword.trim(),
        newPassword: payload.newPassword.trim(),
      });
      if (response?.code === 0) {
        dispatch(actions.getUserInfo(username));
        setInvalidKeys();
        setAlert("Đổi mật khẩu thành công!");
        setTimeout(() => setAlert(""), 5000);
      }
      if (response?.code === 201) {
        setInvalidKeys(response?.result);
        return;
      }
    } catch (error) {
      if (error.response.data?.code === 102) {
        setInvalidKeys({});
        setAlert("Mật khẩu không đúng!");
        setTimeout(() => setAlert(""), 5000);
      }
    }
  };

  const handleChangeAddress = async (e) => {
    e.preventDefault();
    try {
      if (!payload.address.province || !payload.address.district) {
        setAlert("Tỉnh/Thành phố & Quận/Huyện không được để trống!");
        setTimeout(() => setAlert(""), 5000);
        return;
      }
      if (
        payload.address.province !== userData.address?.province?.id ||
        payload.address.district !== userData.address?.district?.id ||
        payload.address.ward !== userData.address?.ward?.id ||
        payload.address.street !== userData.address?.street
      ) {
        const response = await apiChangeAddress({
          username: username,
          fullName: payload.address.fullName.trim(),
          province: payload.address.province,
          district: payload.address.district,
          ward: payload.address.ward,
          street: payload.address.street.trim(),
        });
        if (response?.code === 0) {
          dispatch(actions.getUserInfo(username));
          setAlert("Thay đổi thành công!");
        }
      } else {
        setAlert("Không có thay đổi nào!");
      }
    } catch (error) {
      setAlert("Lỗi!");
      console.log(error);
    }
    setTimeout(() => {
      setAlert("");
    }, 5000);
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
                helperText={invalidKeys?.phone}
                FormHelperTextProps={{ style: { color: "red" } }}
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
                helperText={invalidKeys?.email}
                FormHelperTextProps={{ style: { color: "red" } }}
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
                name="fullName"
                size="small"
                value={payload.address.fullName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BiCurrentLocation className="h-6 w-6 text-gray-500" />
                    </InputAdornment>
                  ),
                  readOnly: true,
                  style: {
                    color: "black",
                  },
                }}
                variant="outlined"
                fullWidth
                onKeyDown={handleKeyDown}
              />
              <FormControl className="relative" fullWidth>
                {!province && <div className="absolute left-3 top-2 z-20">Tỉnh/Thành phố:</div>}
                <Select
                  labelId="provinceId"
                  id="province-select"
                  value={province}
                  size="small"
                  variant="outlined"
                  onChange={(e) => {
                    setProvince(e.target.value);
                    setDistrict("");
                    setWard("");
                  }}
                >
                  <MenuItem
                    value={""}
                    sx={{
                      fontSize: "16px",
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    ---------
                  </MenuItem>
                  {provinces &&
                    provinces?.map((item, index) => {
                      return (
                        <MenuItem
                          key={index}
                          value={item?.id}
                          sx={{
                            fontSize: "16px",
                            textAlign: "center",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {item?.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              <FormControl className="relative" fullWidth>
                {!district && <div className="absolute left-3 top-2 z-20">Quận/Huyện:</div>}
                <Select
                  labelId="districtId"
                  id="district-select"
                  value={district}
                  size="small"
                  variant="outlined"
                  onChange={(e) => {
                    const selectedDistrict = e.target.value;
                    setDistrict(selectedDistrict);
                    setWard("");
                  }}
                >
                  <MenuItem
                    value={""}
                    sx={{
                      fontSize: "16px",
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    ---------
                  </MenuItem>
                  {province &&
                    districts &&
                    districts?.map((item, index) => {
                      return (
                        <MenuItem
                          key={index}
                          value={item?.id}
                          sx={{
                            fontSize: "16px",
                            textAlign: "center",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {item?.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              <FormControl className="relative" fullWidth>
                {!ward && <div className="absolute left-3 top-2 z-20">Phường/Xã:</div>}
                <Select
                  labelId="wardId"
                  id="ward-select"
                  value={ward}
                  size="small"
                  variant="outlined"
                  onChange={(e) => setWard(e.target.value)}
                >
                  <MenuItem
                    value={""}
                    sx={{
                      fontSize: "16px",
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    ---------
                  </MenuItem>
                  {province &&
                    district &&
                    wards &&
                    wards?.map((item, index) => {
                      return (
                        <MenuItem
                          key={index}
                          value={item?.id}
                          sx={{
                            fontSize: "16px",
                            textAlign: "center",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {item?.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              <TextField
                name="street"
                size="small"
                value={street}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Số nhà:</InputAdornment>,
                }}
                variant="outlined"
                fullWidth
                onChange={(e) => setStreet(e.target.value)}
                onKeyDown={handleKeyDown}
                sx={{ "& .css-1pnmrwp-MuiTypography-root": { color: "black" } }}
              />
            </div>
            <Button
              onClick={handleChangeAddress}
              variant="contained"
              color="primary"
              size="large"
              className="mb-2 w-full"
            >
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
                helperText={invalidKeys?.oldPassword}
                FormHelperTextProps={{ style: { color: "red" } }}
                fullWidth
                defaultValue=""
                autoComplete="new-password"
                onChange={handleInputChange}
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
                helperText={invalidKeys?.newPassword}
                FormHelperTextProps={{ style: { color: "red" } }}
                fullWidth
                defaultValue=""
                autoComplete="new-password"
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button
              onClick={handleSubmitChangePassword}
              variant="contained"
              color="primary"
              size="large"
              className="mb-2 w-full"
            >
              Lưu thay đổi
            </Button>
          </div>
        )}
      </Grid2>
    </Grid2>
  );
};

export default memo(EditContact);
