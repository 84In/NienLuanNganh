import axiosConfig from "../axiosConfig";

export const apiGetWardsByDistrict = (district) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/v1/wards/${district}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
