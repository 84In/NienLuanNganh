import axiosConfig from "../axiosConfig";

export const apiAnalytics = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/api/v1/analytics",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
