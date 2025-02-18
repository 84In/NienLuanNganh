import axiosConfig from "../axiosConfig";

export const apiGetProvinces = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/api/v1/provinces",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
