import axiosConfig from "../axiosConfig";

export const apiGetCategories = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/api/v1/categories",
      });
      console.log(response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
