import axiosConfig from "../axiosConfig";

export const apiGetDistrictsByProvince = (province) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/v1/districts/${province}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
