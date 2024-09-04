import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { apiLogin, apiRegister } from "../../services";

const Login = ({ setIsModelLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  const [payload, setPayload] = useState({});

  const handleSubmit = async (payload) => {
    let response = "";
    if (isLogin) {
      setPayload = {
        username: "username",
        password: "password",
      };
      response = await apiLogin(payload);
    } else {
      setPayload = {
        username: "username",
        password: "password",
        email: "email",
        phone: "phone",
        dob: "",
      };
      response = await apiRegister(payload);
    }
  };

  const handleClickOutside = (event) => {
    const box = document.getElementById("box-container");
    if (box && !box.contains(event.target)) {
      setIsModelLogin(false);
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isVisible) return null;

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
        // position: "absolute",
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
            height: "30rem",
            maxWidth: "30rem",
            minWidth: "20rem",
            borderRadius: "25px",
            paddingX: 1,
            paddingTop: 5,
            margin: "auto",
          }}
        >
          <div className="relative w-full">
            <div
              onClick={() => {
                setIsModelLogin(false);
                setIsVisible(false);
              }}
              className="absolute right-[-8px] top-[-40px] flex h-12 w-14 items-center justify-center rounded-es-[25px] rounded-se-[25px] bg-[#1976d2] shadow-md"
            >
              <IoMdClose color="white" fontSize={25} width={30} height={30} />
            </div>
            <h1 className="pb-12 text-center text-3xl font-bold text-[#1976d2]">ĐĂNG NHẬP</h1>
            <div className="flex flex-col items-center justify-center gap-y-9">
              <TextField className="w-[80%]" label="Tài khoản" variant="filled" name="username" required></TextField>
              <TextField
                type="password"
                autoComplete="off"
                className="w-[80%]"
                label="Mật khẩu"
                variant="filled"
                name="password"
                required
              ></TextField>
              <Button className="h-12 w-[80%]" type="submit" size="large" variant="contained">
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
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
            bgcolor: "white",
            width: "90%",
            height: "40rem",
            maxWidth: "30rem",
            minWidth: "20rem",
            borderRadius: "25px",
            paddingX: 1,
            paddingTop: 5,
            margin: "auto",
          }}
        >
          <div className="relative w-full">
            <div
              onClick={() => {
                setIsModelLogin(false);
                setIsVisible(false);
              }}
              className="absolute right-[-8px] top-[-40px] flex h-12 w-14 items-center justify-center rounded-es-[25px] rounded-se-[25px] bg-[#1976d2] shadow-md"
            >
              <IoMdClose color="white" fontSize={25} width={30} height={30} />
            </div>
            <h1 className="pb-8 text-center text-3xl font-bold text-[#1976d2]">ĐĂNG KÝ</h1>
            <div className="flex flex-col items-center justify-center gap-2 align-middle">
              <div>
                <TextField
                  sx={{ m: 1, width: "20ch" }}
                  className="w-[80%]"
                  label="Họ"
                  variant="filled"
                  name="firstname"
                  required
                ></TextField>
                <TextField
                  sx={{ m: 1, width: "20ch" }}
                  className="w-[80%]"
                  label="Tên"
                  variant="filled"
                  name="lastname"
                  required
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
                ></TextField>
                <TextField
                  className="w-[80%]"
                  sx={{ m: 1, width: "20ch" }}
                  label="Ngày sinh"
                  variant="filled"
                  type="date"
                  name="dob"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ placeholder: "" }}
                  required
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
                ></TextField>
              </div>
              <div>
                <TextField
                  id="password2"
                  className="w-[80%]"
                  sx={{ m: 1, width: "42ch" }}
                  label="Nhập lại mật khẩu"
                  variant="filled"
                  name="re-enter-password"
                  type="password"
                  required
                ></TextField>
              </div>
              <Button
                sx={{ m: 1, width: "43ch" }}
                className="h-12 w-[80%]"
                type="submit"
                size="large"
                variant="contained"
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
