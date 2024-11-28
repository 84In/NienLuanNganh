import axiosConfig from "../axiosConfig";

export const apiCreateBanner = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: `/api/v1/banners`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetBannerById = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/v1/banners/${id}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiUpdateBanner = (id, payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: `/api/v1/banners/${id}`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiRemoveBanner = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "DELETE",
        url: `/api/v1/banners/${id}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetBannerByTitle = (title) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/v1/banners/title/${title}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
