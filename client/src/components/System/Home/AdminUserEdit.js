import { Button, FormControl, MenuItem, Select, styled, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { CloudUploadIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import defaultAvatar from "../../../assets/images/profile.png";
import { apiGetRoles } from "../../../services";
import { useNavigate } from "react-router-dom";
import { path } from "../../../utils/constant";

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
  const [dataRoles, setDataRoles] = useState([]);
  const navigate = useNavigate();
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
    const fetchRoles = async () => {
      try {
        const response = await apiGetRoles();
        // console.log(response);
        setDataRoles(response?.result);
      } catch (error) {
        navigate(path.ADMIN_USER);
      }
    };

    fetchRoles();
  }, []);

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

  const handleChange = (event) => {
    setRole(event.target.value);
  };
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
                    />
                  </Button>
                </div>
                <div className="mt-2 flex w-2/3 flex-col items-center justify-center">
                  <FormControl className="relative" fullWidth>
                    <div className="absolute left-3 top-2 z-20">Role:</div>
                    <Select
                      labelId="role"
                      id="role-select"
                      value={role}
                      // defaultValue={"USER"}
                      size="small"
                      variant="outlined"
                      onChange={handleChange}
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
                      {dataRoles &&
                        dataRoles?.map((item, index) => {
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
              <div className="m-2 flex w-full gap-2 p-2">
                <TextField
                  name="address"
                  type="text"
                  value={data?.firstName}
                  variant="outlined"
                  size="small"
                  backgroundColor="white"
                  fullWidth
                  className="bg-white"
                  label="Địa chỉ"
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
