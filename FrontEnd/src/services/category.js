import axiosConfig from "../axiosConfig";

export const apiGetCategories = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/api/v1/categories",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetCategoryById = (categoryId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/v1/categories/${categoryId}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiUpdateCategory = (categoryId, payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: `/api/v1/categories/${categoryId}`,
        data: payload,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiCreateCategory = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: `/api/v1/categories`,
        data: payload,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiRemoveCategory = (categoryId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "DELETE",
        url: `/api/v1/categories/${categoryId}`,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
