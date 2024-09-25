import axiosConfig from "../axiosConfig";

export const apiLogin = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/api/v1/auth/login",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiLogout = (token) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: `/api/v1/auth/logout`,
        data: token,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
