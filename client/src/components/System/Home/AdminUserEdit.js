import React, { useState } from "react";
import avatar from "../../../assets/images/profile.png";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Button, FormControl, InputLabel, MenuItem, Select, styled, TextField } from "@mui/material";
import { CloudUploadIcon } from "lucide-react";

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
        <div className="m-2 w-full rounded-md bg-slate-300 p-2">
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
                <div className="flex flex-col items-center justify-end gap-3">
                  <img className="border-3 h-28 w-28 rounded-full border-gray-200 p-2" src={avatar} alt="avatar" />
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
                    <VisuallyHiddenInput type="file" onChange={(event) => console.log(event.target.files)} multiple />
                  </Button>
                </div>
                <div className="flex w-2/3 flex-col items-center justify-center">
                  <FormControl fullWidth>
                    <InputLabel
                      id="role"
                      sx={{
                        fontSize: "16px", // Kích thước chữ
                        color: "#4A5568", // Màu chữ (ví dụ: xám)
                        top: "50%", // Căn giữa chiều dọc
                        transform: "translateY(-50%)", // Dịch chuyển để nhãn luôn ở giữa
                        textAlign: "center", // Căn giữa chữ theo chiều ngang
                        position: "absolute", // Đặt nhãn ở vị trí tuyệt đối để canh giữa
                        marginLeft: "8px", // Di chuyển nhãn sang bên phải
                      }}
                    >
                      Role
                    </InputLabel>
                    <Select
                      labelId="role"
                      id="role-select"
                      value={role}
                      label="Role"
                      size="small"
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
                      <MenuItem value={""}>-Select-</MenuItem>
                      <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
                      <MenuItem value={"USER"}>USER</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </Grid2>
              <Grid2 display={"flex"} justifyContent={"start"} alignItems={"center"} item xs={6}>
                <div className="flex w-2/3 flex-col items-center justify-center gap-2">
                  <TextField
                    name="username"
                    type="text"
                    defaultValue={user?.username}
                    variant="outlined"
                    size="small"
                    backgroundColor="white"
                    fullWidth
                    className="bg-white"
                    label="Tài khoản"
                    required
                    sx={cssField}
                  />
                  <TextField
                    name="password"
                    type="password"
                    defaultValue={user?.password}
                    variant="outlined"
                    size="small"
                    backgroundColor="white"
                    fullWidth
                    className="bg-white"
                    label="Mật khẩu"
                    required
                    sx={cssField}
                  />
                  <TextField
                    name="firstName"
                    type="text"
                    defaultValue={user?.firstName}
                    variant="outlined"
                    size="small"
                    backgroundColor="white"
                    fullWidth
                    className="bg-white"
                    label="Họ"
                    required
                    sx={cssField}
                  />
                  <TextField
                    name="lastName"
                    type="text"
                    defaultValue={user?.lastName}
                    variant="outlined"
                    size="small"
                    backgroundColor="white"
                    fullWidth
                    className="bg-white"
                    label="Tên"
                    required
                    sx={cssField}
                  />
                  <TextField
                    name="dob"
                    type="date"
                    defaultValue={user?.dob ? new Date(user.dob).toISOString().slice(0, 10) : ""}
                    variant="outlined"
                    size="small"
                    fullWidth
                    className="bg-white"
                    label="Ngày sinh"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                    sx={cssField}
                  />
                </div>
              </Grid2>
            </Grid2>
          </div>
        </div>
        <div className="m-2 w-full rounded-md bg-slate-300 p-2">
          <span className="mb-2 text-xl font-semibold">Thông tin liên hệ</span>
          <div>
            <Grid2 container className="pb-6">
              <div className="m-2 flex w-full gap-2 p-2">
                <TextField
                  name="address"
                  type="text"
                  defaultValue={user?.firstName}
                  variant="outlined"
                  size="small"
                  backgroundColor="white"
                  fullWidth
                  className="bg-white"
                  label="Địa chỉ"
                  sx={cssField}
                />
                <TextField
                  name="email"
                  type="Email"
                  defaultValue={user?.firstName}
                  variant="outlined"
                  size="small"
                  backgroundColor="white"
                  fullWidth
                  className="bg-white"
                  label="Email"
                  sx={cssField}
                />
                <TextField
                  name="phoneNumber"
                  type="Phone"
                  defaultValue={user?.firstName}
                  variant="outlined"
                  size="small"
                  backgroundColor="white"
                  fullWidth
                  className="bg-white"
                  label="Số điện thoại"
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
          Tạo tài khoản
        </Button>
      </div>
    </div>
  );
};

export default AdminUserEdit;
