import { Box, Button, TextField, FormHelperText, Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { apiLogin, apiRegister } from "../../services";

const Login = ({ setIsModelLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const [payload, setPayload] = useState({
    username: "",
    password: "",
    re_password: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    dob: "",
  });

  const handleInputChange = (field) => (event) => {
    setPayload({ ...payload, [field]: event.target.value });
  };

  const handleSubmit = async () => {
    let response = "";

    // Check if required fields are not empty
    const requiredFields = isLogin
      ? ["username", "password"]
      : ["firstname", "lastname", "email", "phone", "dob", "username", "password", "re_password"];

    const isValid = requiredFields.every((field) => payload[field].trim() !== "");
    if (!isValid) {
      setError("Vui lòng điền tất cả các trường bắt buộc!");
      return;
    }

    if (isLogin) {
      response = await apiLogin({ username: payload.username, password: payload.password });
    } else {
      if (payload.password !== payload.re_password) {
        setError("Mật khẩu không khớp!");
        return;
      }
      const { re_password, ...registerPayload } = payload;
      console.log(registerPayload);
      response = await apiRegister(registerPayload);
    }
  };

  const handleClickOutside = (event) => {
    const box = document.getElementById("box-container");
    if (box && !box.contains(event.target)) {
      setIsModelLogin(false);
      setError("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    setError("");
  }, [isLogin]);

  return (
    <Box
      id="box"
      key="box"
      sx={{
        display: "flex",
        justifyContent: "center",
        justifyItems: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        bgcolor: "rgba(0, 0, 0, 0.6)",
        position: "fixed",
        zIndex: 99,
      }}
    >
      {isLogin ? (
        <Box
          id="box-container"
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
            bgcolor: "white",
            width: "90%",
            height: "fit-content",
            maxHeight: "fit-content",
            minheight: "30rem",
            maxWidth: "30rem",
            minWidth: "20rem",
            borderRadius: "28px",
            paddingX: 1,
            paddingY: 5,
            margin: "auto",
          }}
        >
          <div className="relative w-full">
            <div
              onClick={() => {
                setIsModelLogin(false);
              }}
              className="absolute right-[-8px] top-[-40px] flex h-12 w-14 cursor-pointer items-center justify-center rounded-es-[25px] rounded-se-[25px] bg-[#1976d2] shadow-md hover:bg-[#1565c0]"
            >
              <IoMdClose color="white" fontSize={25} width={30} height={30} />
            </div>
            <h1 className="pb-12 text-center text-3xl font-bold text-[#1976d2]">ĐĂNG NHẬP</h1>
            <div className="flex flex-col items-center justify-center gap-y-8">
              {error && (
                <Alert className="w-[80%]" severity="error">
                  {error}
                </Alert>
              )}
              <TextField
                className="w-[80%]"
                label="Tài khoản"
                variant="filled"
                name="username"
                required
                onChange={handleInputChange("username")}
              ></TextField>
              <TextField
                type="password"
                autoComplete="off"
                className="w-[80%]"
                label="Mật khẩu"
                variant="filled"
                name="password"
                required
                onChange={handleInputChange("password")}
              ></TextField>
              <Button className="h-12 w-[80%]" type="submit" size="large" variant="contained" onClick={handleSubmit}>
                Đăng Nhập
              </Button>
              <p>
                Bạn chưa có tài khoản?{" "}
                <a className="cursor-pointer text-[#1976d2]" onClick={() => setIsLogin(false)}>
                  Tạo tài khoản
                </a>
              </p>
            </div>
          </div>
        </Box>
      ) : (
        <Box
          id="box-container"
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
            bgcolor: "white",
            width: "90%",
            height: "fit-content",
            maxHeight: "fit-content",
            minHeight: "30rem",
            maxWidth: "30rem",
            minWidth: "20rem",
            borderRadius: "28px",
            paddingX: 1,
            paddingY: 5,
            margin: "auto",
          }}
        >
          <div className="relative w-full">
            <div
              onClick={() => {
                setIsModelLogin(false);
              }}
              className="absolute right-[-8px] top-[-40px] flex h-12 w-14 cursor-pointer items-center justify-center rounded-es-[25px] rounded-se-[25px] bg-[#1976d2] shadow-md hover:bg-[#1565c0]"
            >
              <IoMdClose color="white" fontSize={25} width={30} height={30} />
            </div>
            <h1 className="pb-6 text-center text-3xl font-bold text-[#1976d2]">ĐĂNG KÝ</h1>

            <div className="flex flex-col items-center justify-center gap-2 align-middle">
              {error && (
                <Alert className="w-[78%]" severity="error">
                  {error}
                </Alert>
              )}
              <div>
                <TextField
                  sx={{ m: 1, width: "20ch" }}
                  className="w-[80%]"
                  label="Họ"
                  variant="filled"
                  name="firstname"
                  required
                  onChange={handleInputChange("firstname")}
                ></TextField>
                <TextField
                  sx={{ m: 1, width: "20ch" }}
                  className="w-[80%]"
                  label="Tên"
                  variant="filled"
                  name="lastname"
                  required
                  onChange={handleInputChange("lastname")}
                ></TextField>
              </div>
              <div>
                <TextField
                  className="w-[80%]"
                  sx={{ m: 1, width: "42ch" }}
                  label="Email"
                  variant="filled"
                  name="email"
                  required
                  onChange={handleInputChange("email")}
                ></TextField>
              </div>
              <div>
                <TextField
                  className="w-[80%]"
                  sx={{ m: 1, width: "20ch" }}
                  label="Số điện thoại"
                  variant="filled"
                  name="phone"
                  required
                  onChange={handleInputChange("phone")}
                ></TextField>
                <TextField
                  className="w-[80%]"
                  sx={{ m: 1, width: "20ch" }}
                  label="Ngày sinh"
                  variant="filled"
                  type="date"
                  name="dob"
                  InputLabelProps={{ shrink: true }}
                  required
                  onChange={handleInputChange("dob")}
                ></TextField>
              </div>
              <div>
                <TextField
                  className="w-[80%]"
                  sx={{ m: 1, width: "42ch" }}
                  label="Tài khoản"
                  variant="filled"
                  name="username"
                  required
                  onChange={handleInputChange("username")}
                ></TextField>
              </div>
              <div>
                <TextField
                  id="password1"
                  className="w-[80%]"
                  sx={{ m: 1, width: "42ch" }}
                  label="Mật khẩu"
                  variant="filled"
                  name="password"
                  type="password"
                  required
                  onChange={handleInputChange("password")}
                ></TextField>
              </div>
              <div>
                <TextField
                  id="password2"
                  className="w-[80%]"
                  sx={{ m: 1, width: "42ch" }}
                  label="Nhập lại mật khẩu"
                  variant="filled"
                  name="re_password"
                  type="password"
                  required
                  onChange={handleInputChange("re_password")}
                ></TextField>
              </div>
              <Button
                sx={{ m: 1, width: "43ch" }}
                className="h-12 w-[80%]"
                type="submit"
                size="large"
                variant="contained"
                onClick={handleSubmit}
              >
                Đăng Ký
              </Button>
              <p>
                Bạn đã có tài khoản?{" "}
                <a className="cursor-pointer text-[#1976d2]" onClick={() => setIsLogin(true)}>
                  Đăng nhập ngay
                </a>
              </p>
            </div>
          </div>
        </Box>
      )}
    </Box>
  );
};

export default Login;
