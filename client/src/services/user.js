import axiosConfig from "../axiosConfig";

export const apiRegister = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: `/api/v1/users`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetUserByUsername = (username) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/v1/users/${username}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetUsers = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/v1/users`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetUserById = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/v1/users/id/${userId}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
