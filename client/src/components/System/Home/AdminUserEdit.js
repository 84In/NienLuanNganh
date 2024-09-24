import { Button, FormControl, MenuItem, Select, styled, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { CloudUploadIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import defaultAvatar from "../../../assets/images/profile.png";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const cssField = {
  backgroundColor: "#fff", // Màu nền của Select
  borderRadius: "8px", // Bo góc
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E2E8F0", // Màu viền mặc định
    },
    "&:hover fieldset": {
      borderColor: "#3182CE", // Màu viền khi hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#3182CE", // Màu viền khi focus
    },
  },
};
const AdminUserEdit = ({ user }) => {
  const [role, setRole] = useState("");
  const { roles, provinces, districts, wards } = useSelector((state) => state.app);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [dataFullAddress, setDataFullAddress] = useState("");
  const [dataAddress, setDataAddress] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setDistrict("");
    setWard("");
    if (province !== "") {
      dispatch(actions.getDistrictsByProvince(province));
    }
  }, [province]);
  useEffect(() => {
    setWard("");
    if (district !== "") {
      dispatch(actions.getWardsByDistrict(district));
    }
  }, [district]);

  useEffect(() => {
    var provinceObj = provinces.find((item) => item.id === province);
    var districtObj = districts && districts.find((item) => item.id === district);
    var wardObj = wards && wards.find((item) => item.id === ward);

    var fullAddress =
      (dataAddress ? dataAddress.trim() + ", " : "") +
      (wardObj ? wardObj?.name + ", " : "") +
      (districtObj ? districtObj?.name + ", " : "") +
      (provinceObj ? provinceObj?.name : "");
    setDataFullAddress(fullAddress);
  }, [province, district, ward, dataAddress]);

  const [data, setData] = useState({
    avatar: null,
    dob: null,
    email: null,
    firstName: null,
    id: null,
    lastName: null,
    phone: null,
    roles: null,
    username: null,
  });

  useEffect(() => {
    if (user) {
      setData({
        avatar: user?.avatar || null,
        dob: user?.dob || null,
        email: user?.email || null,
        firstName: user?.firstName || "",
        id: user?.id || null,
        lastName: user?.lastName || "",
        phone: user?.phone || "",
        roles: user?.roles || [],
        username: user?.username || "",
      });
    }
  }, [user]);

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleChangeRole = handleChange(setRole);
  const handleChangeProvince = handleChange(setProvince);
  const handleChangeDistrict = handleChange(setDistrict);
  const handleChangeWard = handleChange(setWard);
  const handleChangeAddress = handleChange(setDataAddress);

  const CSS_HEADING = "font-bold text-2xl";
  return (
    <div className="flex flex-col">
      <div className="flex w-full items-center justify-center">
        {user ? (
          <span className={CSS_HEADING}>Cập nhật tài khoản</span>
        ) : (
          <span className={CSS_HEADING}>Tạo tài khoản mới</span>
        )}
      </div>
      <div className="mt-2 flex flex-col items-center justify-center p-2">
        <div className="m-2 w-full rounded-md bg-gray-200 p-2">
          <span className="mb-2 text-xl font-semibold">Thông tin cơ bản</span>
          <div>
            <Grid2 container className="pb-6">
              <Grid2
                padding={"10px"}
                justifyContent={"center"}
                alignItems={"center"}
                item
                xs={6}
                className="flex flex-col gap-3"
              >
                <div className="flex flex-col items-center justify-end gap-4">
                  <img
                    className="avatar h-28 w-28 rounded-full border border-black bg-white p-2"
                    src={data?.avatar ? data?.avatar : defaultAvatar}
                    alt="avatar"
                  />
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    sx={{
                      backgroundColor: "#5951da", // Màu tùy chỉnh
                      color: "#fff", // Màu chữ
                      fontSize: "14px", // Kích thước chữ
                      padding: "4px", // Tùy chỉnh padding
                      width: 150, // Chiều rộng tùy chỉnh
                      height: 30, // Chiều cao tùy chỉnh
                      "&:hover": {
                        backgroundColor: "#d32f2f", // Màu khi hover
                      },
                    }}
                  >
                    Tải hình ảnh
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(e) => {
                        console.log(e.target.files);
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => (document.querySelector(".avatar").src = e.target.result);
                          reader.readAsDataURL(file);
                        }
                      }}
                      multiple
                    />
                  </Button>
                </div>
                <div className="mt-2 flex w-2/3 flex-col items-center justify-center">
                  <FormControl className="relative" fullWidth>
                    {!role && <div className="absolute left-3 top-2 z-20">Role:</div>}
                    <Select
                      labelId="role"
                      id="role-select"
                      value={role ? role : data?.roles && data?.roles.lenth > 0 ? data?.roles[0]?.name : ""}
                      // defaultValue={"USER"}
                      size="small"
                      variant="outlined"
                      onChange={handleChangeRole}
                      sx={{
                        ...cssField, // Giữ nguyên các styles khác nếu có
                        fontSize: "14px", // Kích thước chữ bên trong Select nhỏ hơn
                        padding: "8px", // Tùy chỉnh padding
                        height: "40px", // Giảm chiều cao Select
                        borderRadius: "6px", // Bo góc nhỏ hơn
                        alignItems: "center",
                        justifyContent: "center", // Căn giữa giá trị
                        textAlign: "center", // Căn giữa chữ
                      }}
                    >
                      <MenuItem
                        value=""
                        sx={{
                          fontSize: "16px", // Kích thước chữ cho các item
                          textAlign: "center", // Căn giữa chữ trong MenuItem
                          display: "flex",
                          alignItems: "center", // Căn giữa theo chiều dọc
                        }}
                      >
                        ---------
                      </MenuItem>
                      {roles &&
                        roles?.map((item, index) => {
                          return (
                            <MenuItem
                              key={index}
                              value={item?.name}
                              sx={{
                                fontSize: "16px", // Kích thước chữ cho các item
                                textAlign: "center", // Căn giữa chữ trong MenuItem
                                display: "flex",
                                alignItems: "center", // Căn giữa theo chiều dọc
                              }}
                            >
                              {item?.description}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </div>
              </Grid2>
              <Grid2 display={"flex"} justifyContent={"start"} alignItems={"center"} item xs={6}>
                <div className="flex w-2/3 flex-col items-center justify-center gap-4">
                  <div className="flex gap-2">
                    <TextField
                      name="firstName"
                      type="text"
                      value={data?.firstName}
                      variant="outlined"
                      size="small"
                      backgroundColor="white"
                      fullWidth
                      className="bg-white"
                      label="Họ"
                      InputLabelProps={{
                        shrink: true,
                        style: { fontSize: "16px", fontWeight: "bold" }, // Chữ lớn và đậm
                      }}
                      required
                      sx={cssField}
                    />
                    <TextField
                      name="lastName"
                      type="text"
                      value={data?.lastName}
                      variant="outlined"
                      size="small"
                      backgroundColor="white"
                      fullWidth
                      className="bg-white"
                      label="Tên"
                      InputLabelProps={{
                        shrink: true,
                        style: { fontSize: "16px", fontWeight: "bold" }, // Chữ lớn và đậm
                      }}
                      required
                      sx={cssField}
                    />
                  </div>
                  <TextField
                    name="dob"
                    type="date"
                    value={data?.dob ? new Date(data.dob).toISOString().slice(0, 10) : ""}
                    variant="outlined"
                    size="small"
                    fullWidth
                    className="bg-white"
                    label="Ngày sinh"
                    InputLabelProps={{
                      shrink: true,
                      style: { fontSize: "16px", fontWeight: "bold" }, // Chữ lớn và đậm
                    }}
                    required
                    sx={cssField}
                  />
                  <TextField
                    name="username"
                    type="text"
                    value={data?.username}
                    variant="outlined"
                    size="small"
                    backgroundColor="white"
                    fullWidth
                    className="bg-white"
                    label="Tài khoản"
                    InputLabelProps={{
                      shrink: true,
                      style: { fontSize: "16px", fontWeight: "bold" }, // Chữ lớn và đậm
                    }}
                    required
                    sx={cssField}
                  />
                  <TextField
                    name="password"
                    type="password"
                    // defaultValue={data?.password}
                    variant="outlined"
                    size="small"
                    backgroundColor="white"
                    fullWidth
                    className="bg-white"
                    label="Mật khẩu"
                    InputLabelProps={{
                      shrink: true,
                      style: { fontSize: "16px", fontWeight: "bold" }, // Chữ lớn và đậm
                    }}
                    required
                    sx={cssField}
                  />
                </div>
              </Grid2>
            </Grid2>
          </div>
        </div>
        <div className="m-2 w-full rounded-md bg-gray-200 p-2">
          <span className="mb-2 text-xl font-semibold">Thông tin liên hệ</span>
          <div>
            <Grid2 container className="pb-6">
              <div className="flex w-full flex-col gap-2 p-2">
                <div className="m-2 flex w-full gap-2 p-2">
                  <TextField
                    name="fullAddress"
                    type="text"
                    value={dataFullAddress}
                    variant="outlined"
                    size="small"
                    backgroundColor="white"
                    fullWidth
                    className="bg-white"
                    label="Địa chỉ"
                    InputLabelProps={{
                      shrink: true,
                      style: { fontSize: "16px", fontWeight: "bold" },
                      // Chữ lớn và đậm
                    }}
                    InputProps={{
                      readOnly: true,
                      style: {
                        color: "black", // Màu chữ bên trong TextField
                      },
                    }}
                    sx={{
                      ...cssField,
                      fontWeight: "semibold",
                    }}
                  />
                </div>
                <div className="m-2 flex w-full gap-2 p-2">
                  <FormControl className="relative" fullWidth>
                    {!province && <div className="absolute left-3 top-2 z-20">Tỉnh:</div>}
                    <Select
                      labelId="provinceId"
                      id="province-select"
                      value={province ? province : ""}
                      // defaultValue={"USER"}
                      size="small"
                      variant="outlined"
                      onChange={handleChangeProvince}
                      sx={{
                        ...cssField, // Giữ nguyên các styles khác nếu có
                        fontSize: "14px", // Kích thước chữ bên trong Select nhỏ hơn
                        padding: "8px", // Tùy chỉnh padding
                        height: "40px", // Giảm chiều cao Select
                        borderRadius: "6px", // Bo góc nhỏ hơn
                        alignItems: "center",
                        justifyContent: "center", // Căn giữa giá trị
                        textAlign: "center", // Căn giữa chữ
                      }}
                    >
                      <MenuItem
                        value=""
                        sx={{
                          fontSize: "16px", // Kích thước chữ cho các item
                          textAlign: "center", // Căn giữa chữ trong MenuItem
                          display: "flex",
                          alignItems: "center", // Căn giữa theo chiều dọc
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
                                fontSize: "16px", // Kích thước chữ cho các item
                                textAlign: "center", // Căn giữa chữ trong MenuItem
                                display: "flex",
                                alignItems: "center", // Căn giữa theo chiều dọc
                              }}
                            >
                              {item?.name}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>

                  <FormControl className="relative" fullWidth>
                    {!district && <div className="absolute left-3 top-2 z-20">Thành phố:</div>}
                    <Select
                      labelId="districtId"
                      id="district-select"
                      value={district ? district : ""}
                      size="small"
                      variant="outlined"
                      onChange={handleChangeDistrict}
                      sx={{
                        ...cssField, // Giữ nguyên các styles khác nếu có
                        fontSize: "14px", // Kích thước chữ bên trong Select nhỏ hơn
                        padding: "8px", // Tùy chỉnh padding
                        height: "40px", // Giảm chiều cao Select
                        borderRadius: "6px", // Bo góc nhỏ hơn
                        alignItems: "center",
                        justifyContent: "center", // Căn giữa giá trị
                        textAlign: "center", // Căn giữa chữ
                      }}
                    >
                      <MenuItem
                        value=""
                        sx={{
                          fontSize: "16px", // Kích thước chữ cho các item
                          textAlign: "center", // Căn giữa chữ trong MenuItem
                          display: "flex",
                          alignItems: "center", // Căn giữa theo chiều dọc
                        }}
                      >
                        ---------
                      </MenuItem>
                      {districts &&
                        districts?.map((item, index) => {
                          return (
                            <MenuItem
                              key={index}
                              value={item?.id}
                              sx={{
                                fontSize: "16px", // Kích thước chữ cho các item
                                textAlign: "center", // Căn giữa chữ trong MenuItem
                                display: "flex",
                                alignItems: "center", // Căn giữa theo chiều dọc
                              }}
                            >
                              {item?.name}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>

                  <FormControl className="relative" fullWidth>
                    {!ward && <div className="absolute left-3 top-2 z-20">Quận/Huyện:</div>}
                    <Select
                      labelId="wardId"
                      id="ward-select"
                      value={ward ? ward : ""}
                      size="small"
                      variant="outlined"
                      onChange={handleChangeWard}
                      sx={{
                        ...cssField, // Giữ nguyên các styles khác nếu có
                        fontSize: "14px", // Kích thước chữ bên trong Select nhỏ hơn
                        padding: "8px", // Tùy chỉnh padding
                        height: "40px", // Giảm chiều cao Select
                        borderRadius: "6px", // Bo góc nhỏ hơn
                        alignItems: "center",
                        justifyContent: "center", // Căn giữa giá trị
                        textAlign: "center", // Căn giữa chữ
                      }}
                    >
                      <MenuItem
                        value=""
                        sx={{
                          fontSize: "16px", // Kích thước chữ cho các item
                          textAlign: "center", // Căn giữa chữ trong MenuItem
                          display: "flex",
                          alignItems: "center", // Căn giữa theo chiều dọc
                        }}
                      >
                        ---------
                      </MenuItem>
                      {wards &&
                        wards?.map((item, index) => {
                          return (
                            <MenuItem
                              key={index}
                              value={item?.id}
                              sx={{
                                fontSize: "16px", // Kích thước chữ cho các item
                                textAlign: "center", // Căn giữa chữ trong MenuItem
                                display: "flex",
                                alignItems: "center", // Căn giữa theo chiều dọc
                              }}
                            >
                              {item?.name}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </div>
                <div className="m-2 flex w-full gap-2 p-2">
                  <TextField
                    name="address"
                    type="text"
                    value={dataAddress}
                    variant="outlined"
                    size="small"
                    backgroundColor="white"
                    onChange={handleChangeAddress}
                    fullWidth
                    className="bg-white"
                    label="Số nhà"
                    InputLabelProps={{
                      shrink: true,
                      style: { fontSize: "16px", fontWeight: "bold" }, // Chữ lớn và đậm
                    }}
                    sx={cssField}
                  />
                  <TextField
                    name="email"
                    type="Email"
                    value={data?.email}
                    variant="outlined"
                    size="small"
                    backgroundColor="white"
                    fullWidth
                    className="bg-white"
                    label="Email"
                    InputLabelProps={{
                      shrink: true,
                      style: { fontSize: "16px", fontWeight: "bold" }, // Chữ lớn và đậm
                    }}
                    sx={cssField}
                  />
                  <TextField
                    name="phoneNumber"
                    type="Phone"
                    value={data?.phone}
                    variant="outlined"
                    size="small"
                    backgroundColor="white"
                    fullWidth
                    className="bg-white"
                    label="Số điện thoại"
                    InputLabelProps={{
                      shrink: true,
                      style: { fontSize: "16px", fontWeight: "bold" }, // Chữ lớn và đậm
                    }}
                    sx={cssField}
                    required
                  />
                </div>
              </div>
            </Grid2>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center">
        <Button
          type="Submit"
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          sx={{
            backgroundColor: "#5951da", // Màu tùy chỉnh
            color: "#fff", // Màu chữ
            fontSize: "14px", // Kích thước chữ
            padding: "4px ", // Tùy chỉnh padding
            width: 250,
            height: 40,
            "&:hover": {
              backgroundColor: "#d32f2f", // Màu khi hover
            },
          }}
        >
          {user ? "Cập nhật tài khoản" : "Tạo tài khoản"}
        </Button>
      </div>
    </div>
  );
};

export default AdminUserEdit;
