import axiosConfig from "../axiosConfig";

export const apiCreateBrand = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/api/v1/brands",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });