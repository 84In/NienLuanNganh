import axiosConfig from "../axiosConfig";

export const apiGetRoles = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/api/v1/roles",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
