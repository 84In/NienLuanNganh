import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";

const useLogin = (setIsModelLogin) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { isLoggedIn, code } = useSelector((state) => state.auth);
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPayload({ ...payload, [name]: value });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const requiredFields = isLogin
      ? ["username", "password"]
      : ["firstName", "lastName", "email", "phone", "dob", "username", "password", "re_password"];

    const isValid = requiredFields.every((field) => payload[field].trim() !== "");
    if (!isValid) {
      setError("Vui lòng điền tất cả các trường bắt buộc!");
      return;
    }

    if (isLogin) {
      if (!isLoggedIn) {
        dispatch(actions.login({ username: payload.username, password: payload.password }));
      }
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
    setError("");
    if (!isLogin && code === 0) {
      setIsLogin(true);
    }
    if (code === 303 || code === 301) {
      setError("Tài khoản hoặc mật khẩu chưa chính xác!");
    }
    if (code === 304) {
      setError("Số điện thoại đã được sử dụng!");
    }
    if (code === 302) {
      setError("Tên tài khoản đã được sử dụng!");
    }
  }, [code]);

  useEffect(() => {
    if (isLoggedIn) {
      setIsModelLogin(false);
    }
  }, [isLoggedIn, setIsModelLogin]);

  useEffect(() => {
    setError("");
  }, [isLogin]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const boxContainer = document.getElementById("box-container");
      if (boxContainer && !boxContainer.contains(event.target)) {
        setIsModelLogin(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsModelLogin]);

  return {
    isLogin,
    error,
    payload,
    handleInputChange,
    handleKeyDown,
    handleSubmit,
    setIsLogin,
  };
};

export default useLogin;
