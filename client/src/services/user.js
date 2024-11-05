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

export const apiGetCurrentUser = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/v1/users/current-user`,
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

export const apiChangePersonalInfomation = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: `api/v1/users/change/personal-information`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiChangeContactInfomation = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: `api/v1/users/change/contact-information`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiChangePassword = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: `api/v1/users/change/password`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiChangeAddress = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: `api/v1/users/change/address`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiSearchUserByKeyword = (keyword) =>
  new Promise(async (resolve, reject) => {
    try {
      const params = {
        keyword: keyword,
      };
      const response = await axiosConfig({
        method: "GET",
        url: `/api/v1/users/search`,
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
