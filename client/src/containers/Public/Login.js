import { Alert, Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../../store/actions";

const Login = ({ setIsModelLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const [payload, setPayload] = useState({
    username: "",
    password: "",
    re_password: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPayload({ ...payload, [name]: value });
  };

  const handleSubmit = async () => {
    // Check if required fields are not empty
    const requiredFields = isLogin
      ? ["username", "password"]
      : ["firstName", "lastName", "email", "phone", "dob", "username", "password", "re_password"];

    const isValid = requiredFields.every((field) => payload[field].trim() !== "");
    if (!isValid) {
      setError("Vui lòng điền tất cả các trường bắt buộc!");
      return;
    }

    if (isLogin) {
      dispatch(actions.login({ username: payload.username, password: payload.password }));
    } else {
      if (payload.password !== payload.re_password) {
        setError("Mật khẩu không khớp!");
        return;
      }
      const { re_password, ...registerPayload } = payload;
      dispatch(actions.register(registerPayload));
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      setIsModelLogin(false);
      window.location.reload();
    }
  }, [isLoggedIn, setIsModelLogin]);

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
      className="scrollbar-hide"
      sx={{
        display: "flex",
        justifyContent: "center",
        justifyItems: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        bgcolor: "rgba(0, 0, 0, 0.6)",
        position: "fixed",
        overflowY: "auto",
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
              className="absolute right-[-8px] top-[-40px] flex h-12 w-14 cursor-pointer items-center justify-center rounded-es-[25px] rounded-se-[25px] bg-primary-color shadow-md hover:bg-secondary-color"
            >
              <IoMdClose color="white" fontSize={25} width={30} height={30} />
            </div>
            <h1 className="pb-6 text-center text-3xl font-bold text-primary-color">ĐĂNG NHẬP</h1>
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
                onChange={handleInputChange}
              ></TextField>
              <TextField
                type="password"
                autoComplete="off"
                className="w-[80%]"
                label="Mật khẩu"
                variant="filled"
                name="password"
                required
                onChange={handleInputChange}
              ></TextField>
              <Button className="h-12 w-[80%]" type="submit" size="large" variant="contained" onClick={handleSubmit}>
                Đăng Nhập
              </Button>
              <p>
                Bạn chưa có tài khoản?{" "}
                <span
                  className="cursor-pointer text-primary-color hover:text-primary-color hover:underline"
                  onClick={() => setIsLogin(false)}
                >
                  Tạo tài khoản
                </span>
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
              className="absolute right-[-8px] top-[-40px] flex h-12 w-14 cursor-pointer items-center justify-center rounded-es-[25px] rounded-se-[25px] bg-primary-color shadow-md hover:bg-secondary-color"
            >
              <IoMdClose color="white" fontSize={25} width={30} height={30} />
            </div>
            <h1 className="pb-4 text-center text-3xl font-bold text-primary-color">ĐĂNG KÝ</h1>

            <div className="flex flex-col items-center justify-center gap-2 align-middle">
              {error && (
                <Alert className="w-[80%]" severity="error">
                  {error}
                </Alert>
              )}
              <div className="flex w-[80%] gap-2">
                <TextField
                  className="w-full"
                  label="Họ"
                  variant="filled"
                  name="firstName"
                  required
                  onChange={handleInputChange}
                ></TextField>
                <TextField
                  className="w-full"
                  label="Tên"
                  variant="filled"
                  name="lastName"
                  required
                  onChange={handleInputChange}
                ></TextField>
              </div>
              <div className="w-[80%]">
                <TextField
                  className="w-full"
                  label="Email"
                  variant="filled"
                  name="email"
                  required
                  onChange={handleInputChange}
                ></TextField>
              </div>
              <div className="flex w-[80%] gap-2">
                <TextField
                  className="w-full"
                  label="Số điện thoại"
                  variant="filled"
                  name="phone"
                  required
                  onChange={handleInputChange}
                ></TextField>
                <TextField
                  className="w-full"
                  label="Ngày sinh"
                  variant="filled"
                  type="date"
                  name="dob"
                  InputLabelProps={{ shrink: true }}
                  required
                  onChange={handleInputChange}
                ></TextField>
              </div>
              <div className="w-[80%]">
                <TextField
                  className="w-full"
                  label="Tài khoản"
                  variant="filled"
                  name="username"
                  required
                  onChange={handleInputChange}
                ></TextField>
              </div>
              <div className="w-[80%]">
                <TextField
                  id="password1"
                  className="w-full"
                  label="Mật khẩu"
                  variant="filled"
                  name="password"
                  type="password"
                  required
                  onChange={handleInputChange}
                ></TextField>
              </div>
              <div className="w-[80%]">
                <TextField
                  id="password2"
                  className="w-full"
                  label="Nhập lại mật khẩu"
                  variant="filled"
                  name="re_password"
                  type="password"
                  required
                  onChange={handleInputChange}
                ></TextField>
              </div>
              <Button className="h-12 w-[80%]" type="submit" size="large" variant="contained" onClick={handleSubmit}>
                Đăng Ký
              </Button>
              <p>
                Bạn đã có tài khoản?{" "}
                <span
                  className="cursor-pointer text-primary-color hover:text-primary-color hover:underline"
                  onClick={() => setIsLogin(true)}
                >
                  Đăng nhập ngay
                </span>
              </p>
            </div>
          </div>
        </Box>
      )}
    </Box>
  );
};

export default Login;
