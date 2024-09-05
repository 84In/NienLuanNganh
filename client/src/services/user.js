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
